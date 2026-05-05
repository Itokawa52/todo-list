import { Component } from "./component.js";
import { Task } from "./task.js";
import { AddTask } from "./addtask.js";
import { createElement } from "./create_element.js";

const TODO_LIST_STORAGE_KEY = "todo-list-state";

function createId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function createTodo(text) {
    return {
        id: createId(),
        text,
        completed: false,
    };
}

function getDefaultState() {
    return {
        todos: [
            createTodo("Сделать домашку"),
            createTodo("Сделать практику"),
            createTodo("Пойти домой"),
        ],
    };
}

export class TodoList extends Component {
    constructor() {
        super();

        this.state = this.loadState();

        this.onAddTask = this.onAddTask.bind(this);
        this.onCompletedTasks = this.onCompletedTasks.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    loadState() {
        const savedState = localStorage.getItem(TODO_LIST_STORAGE_KEY);

        if (!savedState) {
            return getDefaultState();
        }

        try {
            const parsedState = JSON.parse(savedState);

            if (!parsedState || !Array.isArray(parsedState.todos)) {
                return getDefaultState();
            }

            return {
                todos: parsedState.todos.map((todo) => ({
                    id: todo.id || createId(),
                    text: todo.text,
                    completed: Boolean(todo.completed),
                })),
            };
        } catch (error) {
            console.error("Ошибка чтения localStorage:", error);
            return getDefaultState();
        }
    }

    saveState() {
        localStorage.setItem(
            TODO_LIST_STORAGE_KEY,
            JSON.stringify(this.state)
        );
    }

    render() {
        const children = [];

        for (const todo of this.state.todos) {
            children.push(
                this.getChild(
                    Task,
                    todo.id,
                    {
                        todo,
                        onDelete: this.onDelete,
                        onCompletedTasks: this.onCompletedTasks,
                    }
                ).getDomNode()
            );
        }

        return createElement("div", { class: "todo-list" }, [
            createElement("h1", {}, "TODO List"),

            this.getChild(
                AddTask,
                "add-task",
                {
                    onAddTask: this.onAddTask,
                }
            ).getDomNode(),

            createElement("ul", { id: "todos" }, children),
        ]);
    }

    onAddTask(text) {
        this.state.todos.push(createTodo(text));

        this.saveState();
        this.update();
    }

    onDelete(todoId) {
        const index = this.state.todos.findIndex((todo) => todo.id === todoId);

        if (index === -1) {
            return;
        }

        this.state.todos.splice(index, 1);

        this.removeChild(Task, todoId);

        this.saveState();
        this.update();
    }

    onCompletedTasks(todoId) {
        const todo = this.state.todos.find((todo) => todo.id === todoId);

        if (!todo) {
            return;
        }

        todo.completed = !todo.completed;

        this.saveState();
        this.update();
    }
}
