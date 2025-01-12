<script lang="ts">
  export let label: string;
  export let name: string;
  export let value: string = "";
  export let required = false;
  export let disabled = false;
  export let type: "text" | "datetime-local" = "text";
  export let placeholder = "";
</script>

<div class="form-control w-full">
  <label for={name} class="label">
    <span class="label-text font-medium">{label}</span>
    {#if required}
      <span class="label-text-alt text-error">*Required</span>
    {/if}
  </label>

  <input
    {type}
    id={name}
    {name}
    {required}
    {value}
    {placeholder}
    {disabled}
    class="input input-bordered w-full bg-base-100 focus:input-primary transition-colors duration-200"
  />
</div>
