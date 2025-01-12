<script lang="ts">
    import type { PageData } from './$types';
    import EventForm from '$lib/components/EventForm.svelte';
    export let data: PageData;
    let isSubmitting = false;
</script>
<EventForm 
    event={data.event}
    {isSubmitting}
    submitLabel="Update Event"
    processingLabel="Updating Event..."
/>