<script lang="ts">
	import { type TodoListType } from '../store/todo_store';
	import TodoTask from './TodoTask.svelte';
	export let todoList: TodoListType[] = [];
	export let title: string = '';
</script>

<div class="w-full flex flex-col gap-1">
	<div>{title}</div>
	<div>
		{#each todoList as todo (todo.id)}
			<TodoTask {...todo} />
		{/each}
	</div>
</div>
