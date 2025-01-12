import { fetchEventById } from "$lib/server/remote-events";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({params}) => {
    const eventId = parseInt(params.eventId);
    const event = await fetchEventById(eventId);
    
    if (!event) {
        throw error(404, 'Event not found');
    }
    return {
        event
    }
}