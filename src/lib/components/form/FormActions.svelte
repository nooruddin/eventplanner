<script lang="ts">
    export let submitLabel: string;
    export let processingLabel: string;
    export let isSubmitting = false;
    export let showCancel = true;
</script>
<div class="flex justify-between">
    <button type="submit"
        class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}>
        {#if isSubmitting}
            {processingLabel}
        {:else}
            {submitLabel}
        {/if}
    </button>
    {#if showCancel}
        <a href="/" class="inline-flex justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Cancel
        </a>
    {/if}
</div>