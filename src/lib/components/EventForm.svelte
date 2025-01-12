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

    let dateError = '';
    // Format date to YYYY-MM-DD format
    function formatDate(dateString: string | undefined): string {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    // Get today's date in YYYY-MM-DD format
    const today = formatDate(new Date().toISOString());
    function validateDate(date: string): boolean {
        const selectedDate = new Date(date + 'T00:00:00');
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Reset hours to start of day for fair comparison
        selectedDate.setHours(0, 0, 0, 0); // Ensure both dates are at start of day
        
        if (selectedDate < now) {
            dateError = 'Event date cannot be in the past';
            return false;
        }
        dateError = '';
        return true;
    }

    const handleSubmit: SubmitFunction = () => {
        isSubmitting = true;
        const dateInput = document.querySelector('input[name="date"]') as HTMLInputElement;
        const dateValue = dateInput.value || today; // Use today's date if no date selected
        
        if (!validateDate(dateValue)) {
            isSubmitting = false;
            return () => {};
        }

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
        <div class="space-y-1">
            <InputField
                label="Date"
                name="date"
                type="date"
                value={formatDate(event.date)}
                required
                disabled={isSubmitting}
                on:input={(e: InputEvent) => validateDate((e.target as HTMLInputElement).value)}
            />
            {#if dateError}
                <p class="text-sm text-red-600">{dateError}</p>
            {/if}
        </div>
        <FormActions
            {submitLabel}
            {processingLabel}
            {isSubmitting}
        />
    </div>
</form> 