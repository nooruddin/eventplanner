<script lang="ts">
  import type { ActionData, PageData } from "./$types";
  import EventForm from "$lib/components/EventForm.svelte";
  export let data: PageData;
  export let form: ActionData;
  let isSubmitting = false;
</script>

<EventForm
  event={data.event}
  {isSubmitting}
  submitLabel="Update Event"
  processingLabel="Updating Event..."
/>
{#if form?.error}
  <div class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
    {form.error}
  </div>
{/if}
