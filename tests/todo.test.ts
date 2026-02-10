import { Todo } from '../src/domain/models/aggregates/todo';
import { Priority } from '../src/domain/models/value-objects/Priority';

describe('Todo Aggregate - DDD Concepts', () => {

    //Test 1: Value Objects
    describe('Priority Value Object', () => {
        it('should create a priority', () => {
            const low = Priority.LOW;
            const high = new Priority('HIGH');

            expect(low.value).toBe('LOW');
            expect(high.value).toBe('HIGH');
            expect(low).toBe(Priority.LOW);
        })

        it('should throw error for invalid priority', () => {
            expect(() => new Priority('INVALID' as any)).toThrow('Invalid priority value: INVALID');
        })

        it('should compare priorities', () => {
            const low = Priority.LOW;
            const high = Priority.HIGH;

            expect(low.equals(low)).toBe(true);
            expect(low.equals(high)).toBe(false);
            expect(high.isHigherThan(low)).toBe(true);
            expect(low.isHigherThan(high)).toBe(false);
        })
    })

    //Test 2: Entity Identity
    describe('Todo Entity', () => {
        it('should have unique value', () => {
            const todo1 = Todo.create('Task 1');
            const todo2 = Todo.create('Task 2');

            expect(todo1.id.value).not.toBe(todo2.id.value);
            expect(typeof todo1.id.value).toBe('string');
        })
    })

    //Test 3: Aggregate Business Rules
    describe('Todo Business Rules', () => {
        let todo: Todo;
        beforeEach(() => {
            todo = Todo.create('Task 1');
        })

        it('should not allow empty title', () => {
            expect(() => {
                Todo.create(' ')
            }).toThrow('TODO must have a title');
        })

        it('should not update completed todo', () => {
            todo.complete();

            expect(() => {
                todo.updateTitle('New Title');
            }).toThrow('Cannot update completed ToDos');
        })

        it('should not complete already completed todo', () => {
            todo.complete();

            expect(() => {
                todo.complete();
            }).toThrow('Todo is already completed');
        })
        it('should track when Todos are completed', () => {
            todo.complete();

            expect(todo.isCompleted).toBe(true);
            expect(todo.completedAt).not.toBeNull();
            expect(todo.completedAt).toBeInstanceOf(Date);
        })

        it('should update timestamp on changes', () => {
            const todo = Todo.create('Task 1');
            const initialTimestamp = todo.updatedAt;

            //small delay to ensure the timestamp changes
            setTimeout(() => {
                todo.updateTitle('New Title');
                expect(todo.updatedAt.getTime()).toBeGreaterThan(initialTimestamp.getTime());
            }, 100);


            expect(todo.updatedAt).toBeInstanceOf(Date);
        })

    })

    //Test 4: Business Logic Methods
    describe('Business Logic Methods', () => {
        it('should detect overdue Todos', () => {
            const todo = Todo.create('Overdue Task 1');
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            expect(todo.setDueDate(yesterday)).toThrow('Due date cannot be in the past');

        })

        it('should not mark completed todos as overdue', () => {
            const todo = Todo.create('Task 1');
            todo.complete();
            expect(todo.isOverdue()).toBe(false);
        })
    })

    //Test 5: Value Object Equality
    describe('Value Object Equality', () => {
        it('should compare value objects by value', () => {
            const priority1 = Priority.LOW;
            const priority2 = Priority.LOW;

            expect(priority1.equals(priority2)).toBe(true);
        })


    })

});


