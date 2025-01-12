import { fetchEventById, updateEventById } from "$lib/server/remote-events";
import type { Actions, PageServerLoad } from "./$types";
import { error, fail, redirect } from "@sveltejs/kit";
function formatDateForStorage(dateStr: string): string {
    // Create date at noon UTC to avoid timezone issues
    const date = new Date(dateStr + 'T12:00:00Z');
    return date.toISOString();
}

export const load: PageServerLoad = async ({params}) => {
    const eventId = parseInt(params.eventId);
    const event = await fetchEventById(eventId);
    
    if (!event) {
        throw error(404, 'Event not found');
    }
    return {
        event
    }
};
export const actions: Actions = {
    default: async ({request, params}) => {
        const eventId = parseInt(params.eventId);
        const formdata = await request.formData();
        const title = formdata.get('title')?.toString();
        const description = formdata.get('description')?.toString();
        const date = formdata.get('date')?.toString();
        if (!title || !date) {
            throw error(400, 'Title and Date are required');
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
        const isoDate = formatDateForStorage(date);
        const updatedEvent = await updateEventById(eventId, {
            title, 
            description, 
            date: isoDate
        });
       
        if (!updatedEvent) {
            throw error(404, 'Event not found');
        }
        throw redirect(303, `/${updatedEvent.id}`);
    }
}; 