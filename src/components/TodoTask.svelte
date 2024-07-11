<script lang="ts">
	import { slide } from 'svelte/transition';
	import { todoStore } from '../store/todo_store';
	export let task: string;
	export let is_completed: boolean;
	export let id: number;
	export let completed_at: Date | null;
</script>

<div
	transition:slide
	class="flex gap-5 items-center justify-start px-5 py-3 rounded-md border w-full"
>
	<input
		type="checkbox"
		checked={is_completed}
		on:change={(e) => todoStore.toggleTask(id, !is_completed)}
	/>
	<div class:line-through={is_completed}>
		{task}
	</div>
	<button
		on:click={(e) => {
			if (window.confirm('Are you sure?')) {
				todoStore.removeTask(id);
			}
		}}
		class="ml-auto">X</button
	>
</div>
