import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';
export interface TodoListType {
	id: number;
	task: string;
	is_completed: boolean;
	completed_at: Date | null;
}

class TodoList {
	private counter: number = 1000;
	tasks: Writable<TodoListType[]>;
	constructor() {
		let todoString = browser ? localStorage.getItem('todo') : null;
		let todo: TodoListType[];
		if (todoString) {
			todo = JSON.parse(todoString);
			if (todo.length > 0) {
				this.counter = Math.max(...todo.map(({ id }) => id)) + 1;
			}
		} else {
			todo = [];
		}
		console.log(this.counter);
		this.tasks = writable<TodoListType[]>(todo);
		this.tasks.subscribe((data) => {
			console.log(data);
			if (browser) {
				localStorage.setItem('todo', JSON.stringify(data));
			}
		});
	}

	addTask(task: string) {
		this.tasks.update((todoList) => [
			...todoList,
			{ id: this.counter++, task: task, is_completed: false, completed_at: null }
		]);
	}

	removeTask(taskId: number) {
		this.tasks.update((todoList) => todoList.filter(({ id }) => id != taskId));
	}

	removeAll() {
		this.tasks.set([]);
	}

	toggleTask(taskId: number, is_completed: boolean) {
		this.tasks.update((todoList) =>
			todoList.map((t) => {
				if (t.id != taskId) {
					return t;
				}
				return {
					...t,
					is_completed,
					completed_at: is_completed ? new Date() : null
				};
			})
		);
	}
}

export const todoStore = new TodoList();
