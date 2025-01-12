<script lang="ts">
  import type { PageData } from "./$types";
  import type { Event } from "$lib/server/remote-events";
  import formatDate from "$lib/utils/date";
  export let data: PageData;

  function getEmoji(title: string): string {
    const keywords = {
      // Social Events
      meeting: "🤝",
      party: "🎊",
      birthday: "🎈",
      wedding: "💒",
      celebration: "🎉",
      gathering: "👥",

      // Food & Drinks
      lunch: "🥗",
      dinner: "🍽️",
      breakfast: "☕",
      brunch: "🥂",
      coffee: "☕",
      drinks: "🍻",

      // Activities
      workout: "🏋️‍♂️",
      yoga: "🧘‍♀️",
      running: "🏃‍♂️",
      swimming: "🏊‍♂️",
      hiking: "🏃‍♂️",
      gym: "💪",

      // Education & Work
      study: "📚",
      class: "📝",
      lecture: "👨‍🏫",
      exam: "✍️",
      interview: "💼",
      presentation: "📊",
      workshop: "🛠️",

      // Entertainment
      game: "🎮",
      movie: "🎬",
      concert: "🎵",
      theatre: "🎭",
      show: "🎪",
      music: "🎼",

      // Travel & Places
      travel: "✈️",
      vacation: "🏖️",
      trip: "🗺️",
      flight: "✈️",
      hotel: "🏨",

      // Health
      doctor: "👨‍⚕️",
      dentist: "🦷",
      appointment: "🏥",
      checkup: "🩺",

      // Special
      holiday: "🎄",
      christmas: "🎅",
      halloween: "🎃",
      "new year": "🎆",

      // Default
      default: "📅",
    };
    const lowercaseTitle = title.toLowerCase();
    for (const [keyword, emoji] of Object.entries(keywords)) {
      if (lowercaseTitle.includes(keyword)) {
        return emoji;
      }
    }
    return keywords.default;
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

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each data.events as event}
      <div
        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-in hover:scale-105"
      >
        <div class="card-body gap-4">
          <div class="flex gap-3">
            <!-- Icon Column -->
            <div class="w-12 h-12 flex-shrink-0">
              <div
                class="w-12 h-12 flex items-center justify-center text-2xl bg-primary/10 rounded-xl"
              >
                {getEmoji(event.title)}
              </div>
            </div>

            <!-- Content Column -->
            <div class="flex-1 space-y-3">
              <h2 class="card-title line-clamp-1">{event.title}</h2>

              <div class="min-h-[3rem]">
                <p class="text-base-content/70 line-clamp-2">
                  {event.description || "No description provided"}
                </p>
              </div>

              <div class="flex items-center gap-2 text-sm text-base-content/60">
                <span class="text-lg">⏰</span>
                <time datetime={event.date} class="font-medium">
                  {formatDate(event.date)}
                </time>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="card-actions border-t border-base-200 pt-4 mt-2">
            <div class="flex items-center justify-center w-full">
              <div
                class="inline-flex items-center gap-2 bg-base-200/50 rounded-lg p-1"
              >
                <a
                  href="/{event.id}"
                  class="btn btn-sm bg-base-100 hover:bg-primary/10"
                >
                  <span class="text-lg">👁️</span>
                  <span class="ml-1">View</span>
                </a>
                <a
                  href="/edit/{event.id}"
                  class="btn btn-sm bg-base-100 hover:bg-primary/10"
                >
                  <span class="text-lg">✏️</span>
                  <span class="ml-1">Edit</span>
                </a>
                <button
                  type="submit"
                  class="btn btn-sm bg-base-100 hover:bg-error/10 text-error"
                  formaction="?/deleteEvent"
                  form="delete-{event.id}"
                >
                  <span class="text-lg">🗑️</span>
                  <span class="ml-1">Delete</span>
                </button>
                <form id="delete-{event.id}" method="POST" class="hidden">
                  <input type="hidden" name="eventId" value={event.id} />
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
        <a href="/newevent" class="btn btn-primary gap-2">
          <span class="text-xl">✨</span>
          <span>Create Event</span>
        </a>
      </div>
    {/each}
  </div>
</div>
