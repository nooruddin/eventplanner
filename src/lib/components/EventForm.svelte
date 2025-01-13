<script lang="ts">
  import { enhance } from "$app/forms";
  import { type SubmitFunction } from "@sveltejs/kit";
  import type { Event } from "$lib/server/remote-events";
  import InputField from "./form/InputField.svelte";
  import TextArea from "./form/TextArea.svelte";
  import FormActions from "./form/FormActions.svelte";
  export let event: Partial<Event> = {};
  export let isSubmitting = false;
  export let submitLabel = "Save Event";
  export let processingLabel = "Saving Event...";

  const today = new Date().toISOString();
  function validateDate(date: string): boolean {
    const selectedDate = new Date(date);
    const now = new Date();

    // Set seconds and milliseconds to zero for comparison
    now.setSeconds(0, 0);
    selectedDate.setSeconds(0, 0);

    if (selectedDate < now) {
      return false;
    }
    return true;
  }

  const handleSubmit: SubmitFunction = () => {
    isSubmitting = true;
    const dateInput = document.querySelector(
      'input[name="date"]'
    ) as HTMLInputElement;
    const dateValue = dateInput.value || today; // Use today's date if no date selected

    if (!validateDate(dateValue)) {
      isSubmitting = false;
      return;
    }

    return async ({ update }: { update: () => Promise<void> }) => {
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
      value={event.title || ""}
      required
      disabled={isSubmitting}
    />
    <TextArea
      label="Description"
      name="description"
      value={event.description || ""}
      placeholder="Description"
      disabled={isSubmitting}
    />
    <div class="space-y-1">
      <InputField
        label="Date"
        name="date"
        type="datetime-local"
        value={event.date
          ? new Date(event.date)
              .toLocaleString("sv-SE", {
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              })
              .slice(0, 16)
          : new Date()
              .toLocaleString("sv-SE", {
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              })
              .slice(0, 16)}
        required
        disabled={isSubmitting}
        on:input={(e: CustomEvent<InputEvent>) =>
          validateDate((e.target as HTMLInputElement).value)}
      />
    </div>
    <FormActions {submitLabel} {processingLabel} {isSubmitting} />
  </div>
</form>
