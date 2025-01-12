<script lang="ts">
    import EventForm from '$lib/components/EventForm.svelte';
    let isSubmitting = false;
</script>

<EventForm 
    {isSubmitting}
    submitLabel="Create Event"
    processingLabel="Creating Event..."
/>