<script lang="ts">
  import { beforeUpdate } from "svelte";
  let theme: "light" | "dark";
  let mounted = false;

  beforeUpdate(() => {
    if (!mounted) {
      theme =
        (localStorage.getItem("theme") as "light" | "dark") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
      document.documentElement.setAttribute("data-theme", theme);
      mounted = true;
    }
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
  type="button"
>
  {#if theme === "light"}
    <span class="animate-bounce-in" aria-hidden="true">🌙</span>
  {:else}
    <span class="animate-bounce-in" aria-hidden="true">☀️</span>
  {/if}
</button>
