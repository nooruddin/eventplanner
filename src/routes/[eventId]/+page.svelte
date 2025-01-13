<script lang="ts">
  import type { PageData } from "./$types";
  import { getEventEmoji } from "$lib/utils/eventIcons";
  import formatDate from "$lib/utils/date";
  export let data: PageData;
</script>

<div class="max-w-2xl mx-auto animate-fade-in">
  {#if data.event}
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex items-center gap-4 mb-6">
          <div class="text-6xl animate-bounce-in">
            {getEventEmoji(data.event.title)}
          </div>
          <div>
            <h1 class="text-3xl font-bold">{data.event.title}</h1>
            <p class="text-base-content/60 text-sm">
              Event ID: {data.event.id}
            </p>
          </div>
        </div>

        <div class="divider"></div>

        <div class="space-y-6">
          {#if data.event.description}
            <div class="prose prose-sm max-w-none">
              <h2 class="text-lg font-semibold flex items-center gap-2">
                📝 Description
              </h2>
              <p class="text-base-content/80">{data.event.description}</p>
            </div>
          {/if}
          <div class="prose prose-sm max-w-none">
            <h2 class="text-lg font-semibold flex items-center gap-2">
              📅 Date
            </h2>
            <p class="text-base-content/80">
              <time datetime={data.event.date}
                >{formatDate(data.event.date)}</time
              >
            </p>
          </div>
        </div>
        <div class="card-actions justify-end mt-8">
          <a href="/" class="btn btn-ghost"> 👈 Back to Events </a>
          <a href="/edit/{data.event.id}" class="btn btn-primary">
            ✏️ Edit Event
          </a>
        </div>
      </div>
    </div>
  {:else}
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body text-center">
        <div class="text-6xl mb-4 animate-bounce-in">😢</div>
        <h2 class="text-2xl font-semibold mb-2">Event Not Found</h2>
        <p class="text-base-content/70 mb-6">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <div class="card-actions justify-center">
          <a href="/" class="btn btn-primary"> 👈 Back to Events </a>
        </div>
      </div>
    </div>
  {/if}
</div>
