<script lang="ts">
  import { onMount } from "svelte";
  let theme: "light" | "dark";
  onMount(() => {
    // Get initial theme from localStorage or system preference
    theme =
      (localStorage.getItem("theme") as "light" | "dark") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    document.documentElement.setAttribute("data-theme", theme);
  });
  function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }
</script>

<button
  class="btn btn-ghost btn-circle text-2xl transition-transform hover:rotate-12"
  on:click={toggleTheme}
  aria-label="Toggle theme"
>
  {#if theme === "light"}
    <span class="animate-bounce-in">🌙</span>
  {:else}
    <span class="animate-bounce-in">☀️</span>
  {/if}
</button>
