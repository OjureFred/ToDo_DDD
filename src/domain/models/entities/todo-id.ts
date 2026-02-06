export class TodoId {
    constructor(private readonly value: string) { }

    equals(other: TodoId): boolean {
        return this.value === other.value;
    }

    static generate(): TodoId {
        return new TodoId(`todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
}