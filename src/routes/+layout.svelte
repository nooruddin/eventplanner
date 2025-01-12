<script lang="ts">
  import "../app.css";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";
</script>

<div class="min-h-screen bg-base-200 transition-colors duration-300">
  <nav class="navbar bg-base-100 shadow-lg px-4 sm:px-8">
    <div class="flex-1">
      <a
        href="/"
        class="text-2xl font-bold text-primary hover:text-primary-focus transition-colors flex items-center gap-2"
      >
        <span class="text-3xl">⭐</span>
        <span
          class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >EventPlanner</span
        >
      </a>
    </div>
    <div class="flex-none gap-2">
      <ThemeToggle />
      <a href="/newevent" class="btn btn-primary">
        <span class="text-xl mr-2">✨</span> New Event
      </a>
    </div>
  </nav>
  <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
    <slot />
  </main>
  <footer class="footer footer-center p-4 bg-base-300 text-base-content">
    <div>
      <p>Made with 💜 using SvelteKit</p>
    </div>
  </footer>
</div>
