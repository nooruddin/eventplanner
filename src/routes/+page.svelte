<script lang="ts">
  import type { PageData } from "./$types";
  import type { Event } from "$lib/server/remote-events";
  import { getEventEmoji } from "$lib/utils/eventIcons";
  import { enhance } from "$app/forms";

  export let data: PageData;

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
</script>

<div class="space-y-8">
  <header class="text-center space-y-4">
    <h1
      class="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
    >
      Your Events
    </h1>
    <p class="text-base-content/70">
      Organize your life, one event at a time ✨
    </p>
  </header>

  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
  >
    {#each data.events as event}
      <div
        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-in hover:scale-105"
      >
        <div class="card-body gap-4">
          <div class="flex gap-3">
            <!-- Icon Column -->
            <div class="w-10 h-10 flex-shrink-0">
              <div
                class="w-10 h-10 flex items-center justify-center text-xl bg-primary/10 rounded-xl"
              >
                {getEventEmoji(event.title)}
              </div>
            </div>

            <!-- Content Column -->
            <div class="flex-1 space-y-3">
              <h2 class="card-title text-base line-clamp-1">{event.title}</h2>

              <div class="min-h-[3rem]">
                <p class="text-base-content/70 text-sm line-clamp-2">
                  {event.description || "No description provided"}
                </p>
              </div>

              <div class="flex items-center gap-2 text-xs text-base-content/60">
                <span class="text-base">⏰</span>
                <time datetime={event.date} class="font-medium">
                  {formatDate(event.date)}
                </time>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="card-actions border-t border-base-300 pt-4 mt-2">
            <div class="flex items-center justify-center w-full">
              <div
                class="inline-flex items-center gap-0.5 bg-base-200 rounded-lg p-0.5"
              >
                <a
                  href="/{event.id}"
                  class="btn btn-xs sm:btn-sm bg-base-100 hover:bg-primary/10 min-h-0 h-8"
                  rel="prefetch"
                >
                  <span class="text-base">👁️</span>
                  <span class="ml-0.5 text-xs sm:text-sm hidden sm:inline"
                    >View</span
                  >
                </a>
                <a
                  href="/edit/{event.id}"
                  class="btn btn-xs sm:btn-sm bg-base-100 hover:bg-primary/10 min-h-0 h-8"
                  rel="prefetch"
                >
                  <span class="text-base">✏️</span>
                  <span class="ml-0.5 text-xs sm:text-sm hidden sm:inline"
                    >Edit</span
                  >
                </a>
                <form
                  method="POST"
                  action="?/deleteEvent"
                  use:enhance={() => {
                    return async ({ update }) => {
                      await update({ reset: false });
                    };
                  }}
                  class="contents"
                >
                  <input type="hidden" name="eventId" value={event.id} />
                  <button
                    type="submit"
                    class="btn btn-xs sm:btn-sm bg-base-100 hover:bg-error/10 text-error min-h-0 h-8"
                  >
                    <span class="text-base">🗑️</span>
                    <span class="ml-0.5 text-xs sm:text-sm hidden sm:inline"
                      >Delete</span
                    >
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div
        class="col-span-full text-center py-12 bg-base-100 rounded-box animate-fade-in"
      >
        <div class="text-5xl mb-4">✨</div>
        <h3 class="text-xl font-semibold mb-2">No Events Yet</h3>
        <p class="text-base-content/70 mb-6">
          Start by creating your first event!
        </p>
        <a href="/newevent" class="btn btn-primary gap-2" rel="prefetch">
          <span class="text-xl">✨</span>
          <span>Create Event</span>
        </a>
      </div>
    {/each}
  </div>
</div>
