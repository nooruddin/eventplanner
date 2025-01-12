import { createEvent } from "$lib/server/remote-events";
import type { Actions } from "./$types";
import { error, fail, redirect } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request }) => {
    const formdata = await request.formData();
    const title = formdata.get("title")?.toString();
    const description = formdata.get("description")?.toString();
    let date = formdata.get("date")?.toString();
    if (!title) {
      throw error(400, "Title is required");
    }

    const now = new Date();
    if (new Date(date) < now) {
      return fail(400, {
        error: "Event date cannot be in the past",
        data: { title, description, date },
      });
    }
    const newEvent = await createEvent({
      title,
      description,
      date: date,
    });

    throw redirect(303, `/${newEvent.id}`);
  },
};
