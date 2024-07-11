<script lang="ts">
	import { browser } from '$app/environment';
	import TodoList from '../components/TodoList.svelte';
	import { todoStore, type TodoListType } from '../store/todo_store';
	import { onMount } from 'svelte';
	let task: string;
	let todoList: TodoListType[] = [];
	function handleTodoSubmit() {
		if (!task.trim()) {
			return;
		}
		todoStore.addTask(task);
		task = '';
	}

	onMount(() => {
		let unsubscribe = todoStore.tasks.subscribe((list) => (todoList = list));
		return () => unsubscribe();
	});
</script>

<div class="container max-w-screen-sm p-5 w-full mx-auto gap-5 flex flex-col">
	<div class="w-full rounded-md border-gray-200 border flex items-stretch">
		<input
			class="w-full text-xl py-3 px-5"
			placeholder="Enter your task"
			bind:value={task}
			on:keydown={(e) => {
				if (e.key !== 'Enter') return;

				handleTodoSubmit();
			}}
		/>
		<button
			on:click={() => {
				handleTodoSubmit();
			}}
			class="px-5 py-3"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-corner-down-left"
				><polyline points="9 10 4 15 9 20" /><path d="M20 4v7a4 4 0 0 1-4 4H4" /></svg
			></button
		>
	</div>
	<div class="flex gap-5 flex-col md:flex-row w-full">
		<TodoList
			title="Pending Tasks"
			todoList={todoList.filter(({ is_completed }) => !is_completed)}
		/>
		<TodoList
			title="Completed Tasks"
			todoList={todoList.filter(({ is_completed }) => is_completed)}
		/>
	</div>
	<div class="flex justify-center">
		<button
			on:click={() => {
				if (browser) {
					todoStore.removeAll();
				}
			}}
			class="bg-red-600 text-white px-5 py-3 rounded-md">Clear all</button
		>
	</div>
</div>
