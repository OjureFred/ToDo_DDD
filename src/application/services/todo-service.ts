import { Todo } from "../../domain/models/aggregates/todo";
import { Priority } from "../../domain/models/value-objects/Priority";
import { ITodoRepository } from "../../domain/repositories/todo-repository";

//Simple application service
export class TodoService {
    constructor(private todoRepository: ITodoRepository) { }

    async createTodo(title: string, description?: string): Promise<Todo> {
        const todo = Todo.create(title, description);
        await this.todoRepository.save(todo);
        return todo;
    }

    async completeTodo(todoId: string): Promise<Todo> {
        const todo = await this.todoRepository.findById({ value: todoId } as any);
        if (!todo) {
            throw new Error('Todo not found');
        }
        todo.complete();
        await this.todoRepository.save(todo);
        return todo;
    }

    async updateTodoPriority(todoId: string, priorityValue: string): Promise<Todo> {
        const todo = await this.todoRepository.findById({ value: todoId } as any);
        if (!todo) {
            throw new Error('Todo not found');
        }
        const priority = new Priority(priorityValue as any);
        todo.changePriority(priority);
        await this.todoRepository.save(todo);
        return todo;
    }

    async getAllTodos(): Promise<Todo[]> {
        return this.todoRepository.findAll();
    }

    async getTodosByPriority(priorityValue: string): Promise<Todo[]> {
        const priority = new Priority(priorityValue as any);
        return this.todoRepository.findByPriority(priority);
    }

    async getOverdueTodos(): Promise<Todo[]> {
        const allTodos = await this.todoRepository.findAll();
        return allTodos.filter(todo => todo.isOverdue());
    }

    async updateTitle(todoId: string, title: string): Promise<Todo> {
        const todo = await this.todoRepository.findById({ value: todoId } as any);
        if (!todo) {
            throw new Error('Todo not found');
        }
        todo.updateTitle(title);
        await this.todoRepository.save(todo);
        return todo;
    }

    async updateDescription(todoId: string, description: string): Promise<Todo> {
        const todo = await this.todoRepository.findById({ value: todoId } as any);
        if (!todo) {
            throw new Error('Todo not found');
        }
        todo.updateDescription(description);
        await this.todoRepository.save(todo);
        return todo;
    }

    async deleteTodo(todoId: string): Promise<void> {
        const todo = await this.todoRepository.findById({ value: todoId } as any);
        if (!todo) {
            throw new Error('Todo not found');
        }
        await this.todoRepository.delete(todo.Id);
    }
}