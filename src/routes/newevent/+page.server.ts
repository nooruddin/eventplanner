import { createEvent } from "$lib/server/remote-events";
import type { Actions } from "./$types";
import { error, fail, redirect } from "@sveltejs/kit";
function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const actions: Actions = {
    default: async ({request}) => {
        const formdata = await request.formData();
        const title = formdata.get('title')?.toString();
        const description = formdata.get('description')?.toString();
        let date = formdata.get('date')?.toString();
        if (!title) {
            throw error(400, 'Title is required');
        }
        // If no date provided, use today's date
        if (!date) {
            date = formatDate(new Date());
        }
        // Validate that the date is not in the past
        const selectedDate = new Date(date + 'T00:00:00');
        selectedDate.setHours(0, 0, 0, 0); // Reset time to start of day
        
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Reset time to start of day
        if (selectedDate < now) {
            return fail(400, {
                error: 'Event date cannot be in the past',
                data: { title, description, date }
            });
        }
        // Add time component to make it consistent (set to noon of the selected date)
        const eventDate = new Date(date + 'T12:00:00');
        const isoDate = eventDate.toISOString();
        const newEvent = await createEvent({
            title, 
            description, 
            date: isoDate
        });
        
        throw redirect(303, `/${newEvent.id}`);
    }
}