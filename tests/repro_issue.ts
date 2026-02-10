
import { Priority } from '../src/domain/models/value-objects/Priority';

try {
    const priority = Priority.HIGH;
    // @ts-ignore - we want to replicate the runtime error or type error check
    console.log(priority.getValue());
} catch (error: any) {
    console.log("Error caught:", error.message);
}
