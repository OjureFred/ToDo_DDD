import { Todo } from '../../domain/models/aggregates/todo';
import { ITodoRepository } from '../../domain/repositories/todo-repository';
import { TodoId } from '../../domain/models/entities/todo-id';
import { Priority } from '../../domain/models/value-objects/Priority';

export class InMemoryTodoRepository implements ITodoRepository {
    private todos: Map<string, Todo> = new Map();

    async save(todo: Todo): Promise<void> {
        this.todos.set(todo.Id.value, todo);
    }

    async findById(id: TodoId): Promise<Todo | null> {
        return this.todos.get(id.value) || null;
    }

    async findAll(): Promise<Todo[]> {
        return Array.from(this.todos.values());
    }

    async findByPriority(priority: Priority): Promise<Todo[]> {
        return Array.from(this.todos.values()).filter(todo => todo.priority.equals(priority));
    }

    async findCompleted(): Promise<Todo[]> {
        return Array.from(this.todos.values()).filter(todo => todo.isCompleted);
    }

    async findPending(): Promise<Todo[]> {
        return Array.from(this.todos.values()).filter(todo => !todo.isCompleted);
    }

    async delete(id: TodoId): Promise<void> {
        this.todos.delete(id.value);
    }
}