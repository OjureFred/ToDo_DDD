import { TodoService } from "./application/services/todo-service";
import { InMemoryTodoRepository } from "./infrastructure/persistence/in-memory-todo-repository";
import { Priority } from "./domain/models/value-objects/Priority";

async function learnDDDWithTodos() {
    console.log('====== LEARNING DDD WITH TODOS ======\n');

    //1. Setup
    const repository = new InMemoryTodoRepository();
    const todoService = new TodoService(repository);

    //2. Create a new Todo
    console.log('2. Creating Todos:');
    const todo1 = await todoService.createTodo('Learn DDD', 'Learn Domain Driven Design');
    const todo2 = await todoService.createTodo('Practice Value Objects', 'Create at least 3 Value Objects');
    const todo3 = await todoService.createTodo('Understand Aggregates', 'Revise about Aggregates');

    console.log(`✅ Created ${(await repository.findAll()).length} todos\n`);

    //3. Update a Todo
    console.log('3. Updating a Todo:');
    await todoService.updateTitle(todo1.Id.value, 'Learn DDD (Updated)');
    console.log(`✅ Updated todo ${todo1.Id.value}\n`);

    //3. Change Priority
    console.log('4. Changing Priority:');
    await todoService.updateTodoPriority(todo1.Id.value, 'HIGH');
    await todoService.updateTodoPriority(todo2.Id.value, 'LOW');
    await todoService.updateTodoPriority(todo3.Id.value, 'MEDIUM');

    console.log(`✅ Changed priority of todo ${todo1.Id.value}\n`);

    //5. Complete a Todo
    console.log('5. Completing a Todo:');
    await todoService.completeTodo(todo1.Id.value);
    console.log(`✅ Completed todo ${todo1.Id.value}\n`);

    //6. Get Todos by Priority
    console.log('6. Getting Todos by Priority:');
    const highPriorityTodos = await todoService.getTodosByPriority('HIGH');
    console.log(`✅ Found ${highPriorityTodos.length} high priority todos\n`);

    //7. Try business rule violations
    console.log('7. Testing busines rules.....');

    try {
        //Try to update a complete ToDo
        todo1.updateTitle('Updated Title');
    } catch (error: any) {
        console.log(`✅ Correctly blocked: ${error.message}`)
    }

    try {
        //Try to complete an already completed todo
        await todoService.completeTodo(todo1.Id.value);
    } catch (error: any) {
        console.log(`✅ Correctly blocked: ${error.message}`)
    }

    //9. Delete a Todo
    console.log('9. Deleting a Todo:');
    await todoService.deleteTodo(todo1.Id.value);
    console.log(`✅ Deleted todo ${todo1.Id.value}\n`);

    //10. Final state
    console.log('\n======FINAL TODOS========');
    const allTodos = await repository.findAll();
    allTodos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo.title}`)
        console.log(` ID: ${todo.Id.value}`)
        console.log(` Priority: ${todo.priority}`)
        console.log(` IsCompleted: ${todo.isCompleted}`)
        console.log(` CreatedAt: ${todo.createdAt.toLocaleTimeString()}`)
        console.log(` UpdatedAt: ${todo.updatedAt.toLocaleTimeString()}`)
    })

}

learnDDDWithTodos();