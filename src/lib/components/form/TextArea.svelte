<script lang="ts">
    export let label: string;
    export let name: string;
    export let value: string = '';
    export let rows = 4;
    export let disabled = false;
    export let placeholder = '';
</script>
<div>
    <label for={name} class="block text-sm font-medium text-gray-700">{label}</label>
    <textarea id={name} {name} {rows} {placeholder}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        {disabled}>{value}</textarea>
</div> 