import { Todo } from "../models/aggregates/todo";
import { TodoId } from "../models/entities/todo-id";
import { Priority } from "../models/value-objects/Priority";

//Repository Interface
export interface ITodoRepository {
    save(todo: Todo): Promise<void>;
    findById(id: TodoId): Promise<Todo | null>;
    findAll(): Promise<Todo[]>;
    findByPriority(priority: Priority): Promise<Todo[]>;
    findCompleted(): Promise<Todo[]>;
    findPending(): Promise<Todo[]>;
    delete(id: TodoId): Promise<void>;
}