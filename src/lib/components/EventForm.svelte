<script lang="ts">
    import { enhance } from '$app/forms';
    import { type SubmitFunction } from '@sveltejs/kit';
    import type { Event } from '$lib/server/remote-events';
    import InputField from './form/InputField.svelte';
    import TextArea from './form/TextArea.svelte';
    import FormActions from './form/FormActions.svelte';
    export let event: Partial<Event> = {};
    export let isSubmitting = false;
    export let submitLabel = 'Save Event';
    export let processingLabel = 'Saving Event...';
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
        <InputField
            label="Title"
            name="title"
            value={event.title || ''}
            required
            disabled={isSubmitting}
        />
        <TextArea
            label="Description"
            name="description"
            value={event.description || ''}
            placeholder="Description"
            disabled={isSubmitting}
        />
        <InputField
            label="Date"
            name="date"
            type="datetime-local"
            value={event.date || ''}
            required
            disabled={isSubmitting}
        />
        <FormActions
            {submitLabel}
            {processingLabel}
            {isSubmitting}
        />
    </div>
</form> 