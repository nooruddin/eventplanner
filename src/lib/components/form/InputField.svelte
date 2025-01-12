<script lang="ts">
    export let label: string;
    export let name: string;
    export let value: string = '';
    export let required = false;
    export let disabled = false;
    export let type: 'text' | 'datetime-local' = 'text';
    export let placeholder = '';
</script>
<div>
    <label for={name} class="block text-sm font-medium text-gray-700">{label}</label>
    <input {type} id={name} {name} {required} {value} {placeholder}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        {disabled}>
</div>