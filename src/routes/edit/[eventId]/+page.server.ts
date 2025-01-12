import { fetchEventById, updateEventById } from "$lib/server/remote-events";
import type { Actions, PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
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
        const updatedEvent = await updateEventById(eventId, {title, description, date});
        if (!updatedEvent) {
            throw error(404, 'Event not found');
        }
        throw redirect(303, `/${updatedEvent.id}`);
    }
}; 