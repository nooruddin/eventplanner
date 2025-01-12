<script lang="ts">
  import EventForm from "$lib/components/EventForm.svelte";
  import type { ActionData } from "./$types";

  export let form: ActionData;
  let isSubmitting = false;
</script>

<EventForm
  {isSubmitting}
  submitLabel="Create Event"
  processingLabel="Creating Event..."
  event={form?.data}
/>
{#if form?.error}
  <div class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
    {form.error}
  </div>
{/if}
