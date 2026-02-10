export class Priority {
    private static readonly VALID_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const;

    constructor(readonly value: typeof Priority.VALID_PRIORITIES[number]) {
        if (!Priority.VALID_PRIORITIES.includes(value)) {
            throw new Error(`Invalid priority value: ${value}`);
        }
    }

    //Value objects define equality by value, not by reference
    equals(other: Priority): boolean {
        return this.value === other.value;
    }

    //Simple  business rule: 
    isHigherThan(other: Priority): boolean {
        const priorityOrder = { LOW: 0, MEDIUM: 1, HIGH: 2, URGENT: 3 };
        return priorityOrder[this.value] > priorityOrder[other.value];
    }

    //Factory Methods
    static LOW = new Priority('LOW');
    static MEDIUM = new Priority('MEDIUM');
    static HIGH = new Priority('HIGH');
    static URGENT = new Priority('URGENT');

    //Value objects define a string representation
    toString(): string {
        return this.value;
    }

}
