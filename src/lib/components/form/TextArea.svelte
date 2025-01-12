<script lang="ts">
  export let label: string;
  export let name: string;
  export let value: string = "";
  export let required = false;
  export let disabled = false;
  export let placeholder = "";
  export let rows = 4;
</script>

<div class="form-control w-full">
  <label for={name} class="label">
    <span class="label-text font-medium">{label}</span>
    {#if required}
      <span class="label-text-alt text-error">*Required</span>
    {/if}
  </label>

  <textarea
    id={name}
    {name}
    {rows}
    {required}
    {disabled}
    {placeholder}
    class="textarea textarea-bordered bg-base-100 focus:textarea-primary transition-colors duration-200 min-h-[8rem]"
    >{value}</textarea
  >
</div>
