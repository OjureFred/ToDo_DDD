import { TodoId } from "../entities/todo-id";
import { Priority } from "../value-objects/Priority"

export class Todo {
    private _completedAt: Date | null = null;

    constructor(
        private _id: TodoId,
        private _title: string,
        private _description: string,
        private _priority: Priority = Priority.MEDIUM,
        private _isCompleted: boolean = false,
        private _createdAt: Date = new Date(),
        private _updatedAt: Date = new Date(),
        private _dueDate?: Date
    ) {
        this.validate();
    }
    //Getters
    get id(): TodoId { return this._id; }
    get title(): string { return this._title; }
    get description(): string { return this._description; }
    get priority(): Priority { return this._priority; }
    get isCompleted(): boolean { return this._isCompleted; }
    get createdAt(): Date { return this._createdAt; }
    get updatedAt(): Date { return this._updatedAt; }
    get dueDate(): Date | undefined { return this._dueDate; }
    get completedAt(): Date | null { return this._completedAt; }

    private validate(): void {
        if (!this.title.trim()) {
            throw new Error('TODO must have a title');
        }
        if (this.title.length > 100) {
            throw new Error('Title cannot exceed 100 characters');
        }
    }

    //Business Rules
    updateTitle(newTitle: string): void {
        if (this._isCompleted) {
            throw new Error('Cannot update completed ToDos')
        }
        this._title = newTitle;
        this._updatedAt = new Date();
        this.validate();
    }
    updateDescription(newDescription: string): void {
        if (this._isCompleted) {
            throw new Error('Cannot update completed ToDos')
        }
        this._description = newDescription;
        this._updatedAt = new Date();
    }

    changePriority(newPriority: Priority): void {
        if (this._isCompleted) {
            throw new Error('Cannot update completed Todos')
        }
        this._priority = newPriority;
        this._updatedAt = new Date();
    }
    complete(): void {
        if (this._isCompleted) {
            throw new Error('Todo is already completed')
        }
        this._isCompleted = true;
        this._completedAt = new Date();
        this._updatedAt = new Date();
    }
    uncomplete(): void {
        if (!this._isCompleted) {
            throw new Error('Todo is not completed')
        }
        this._isCompleted = false;
        this._completedAt = null;
        this._updatedAt = new Date();
    }
    setDueDate(date: Date): void {
        if (date < new Date()) {
            throw new Error('Due date cannot be in the past');
        }
        this._dueDate = date;
        this._updatedAt = new Date();
    }
    isOverdue(): boolean {
        if (!this._dueDate || this._isCompleted) {
            return false;
        }
        return new Date() > this._dueDate
    }

    //Factory method
    static create(title: string, description?: string): Todo {
        return new Todo(
            TodoId.generate(),
            title,
            description || ''
        );
    }



}