<script lang="ts">
	import type { PageData } from "./$types";
    import type { Event } from "$lib/server/remote-events";
    export let data: PageData;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<h1 class="text-xl mb-4">Events</h1>
{#each data.events as event}
    <div class="mb-6 p-4 border rounded-lg shadow-sm">
        <div class="flex justify-between items-start">
            <div>
                <h2 class="text-lg font-bold">{event.title}</h2>
                <p class="text-gray-600">{event.description}</p>
                <p class="text-sm text-gray-500">{new Date(event.date).toLocaleString()}</p>
            </div>
            <div class="space-x-2">
                <a href="/edit/{event.id}" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Edit
                </a>
                <form method="POST" action="?/deleteEvent" class="inline">
                    <input type="hidden" name="eventId" value={event.id}>
                    <button type="submit" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Delete
                    </button>
                </form>
            </div>
        </div>
    </div>
{/each}

<a class="btn bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 inline-block" href="/newevent" role="button">Add Event</a>