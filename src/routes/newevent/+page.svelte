<script lang="ts">
    import { enhance } from '$app/forms';
    import { type SubmitFunction } from '@sveltejs/kit';
    let isSubmitting = false;
    const handleSubmit: SubmitFunction = () => {
        isSubmitting = true;
        
        return async ({ update }) => {
            await update();
            isSubmitting = false;
        };
    };
</script>

<form method="POST" use:enhance={handleSubmit}>
    <div class="space-y-4">
        <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="title" name="title" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                disabled={isSubmitting}>
        </div>
        <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" name="description" rows="4"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Description" disabled={isSubmitting}></textarea>
        </div>
        <div>
            <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
            <input type="datetime-local" id="date" name="date" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                disabled={isSubmitting}>
        </div>
        <button type="submit"
            class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}>
            {#if isSubmitting}
                Creating Event...
            {:else}
                Create Event
            {/if}
        </button>
    </div>
</form>