<script lang="ts">
	import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class="max-w-2xl mx-auto py-8">
    {#if data.event}
        <div class="bg-white shadow rounded-lg p-6">
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-gray-900">{data.event.title}</h2>
                <p class="text-sm text-gray-500 mt-1">Event ID: {data.event.id}</p>
            </div>
            {#if data.event.description}
                <div class="mb-4">
                    <h3 class="text-sm font-medium text-gray-700 mb-2">Description</h3>
                    <p class="text-gray-600">{data.event.description}</p>
                </div>
            {/if}
            <div>
                <h3 class="text-sm font-medium text-gray-700 mb-2">Date and Time</h3>
                <p class="text-gray-600">{new Date(data.event.date).toLocaleString()}</p>
            </div>
            <div class="mt-6 flex space-x-3">
                <a href="/edit/{data.event.id}" 
                    class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Edit Event
                </a>
                <a href="/" 
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Back to Events
                </a>
            </div>
        </div>
    {:else}
        <div class="text-center">
            <h2 class="text-xl font-semibold text-gray-900">Event not found</h2>
            <p class="mt-2 text-gray-600">The event you're looking for doesn't exist or has been removed.</p>
            <a href="/" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Back to Events
            </a>
        </div>
    {/if}
</div>