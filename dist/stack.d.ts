export declare class Stack<T> {
    #private;
    constructor();
    Push(value: T): void;
    Pop(): T;
    Empty(): void;
    Peek(): T;
    Count(): number;
}
