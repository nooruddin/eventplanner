import { deleteEventById, fetchAllEvents } from "$lib/server/remote-events";
import type { Actions, PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  return {
    // Make events streamable
    streamed: {
      events: fetchAllEvents()
    }
  };
};

export const actions: Actions = {
  deleteEvent: async ({ request }) => {
    const formData = await request.formData();
    const eventId = formData.get("eventId")?.toString();

    if (!eventId) {
      throw error(400, "Event ID is required");
    }
    const success = await deleteEventById(parseInt(eventId));
    if (!success) {
      throw error(404, "Event not found");
    }
    return { success: true };
  },
};
