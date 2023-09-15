import { Stack } from './stack';

export class EquationStack {

    #value: number;
    #stack_numbers: Stack<number>;
    #stack_operators: Stack<string>;
    #equation: string;
    #operators: { [operator: string]: (x: number, y: number) => number };

    constructor() {

        this.#value = 0;
        this.#stack_numbers = new Stack();
        this.#stack_operators = new Stack();
        this.#equation = '';
        this.#operators = {
            '+': (x, y) => x + y,
            'x': (x, y) => x * y
        };

    }

    Reset(): void {

        this.#value = 0;
        this.#stack_numbers.Empty();
        this.#stack_operators.Empty();
        this.#equation = '';
        
    }

    Output(): string {
        
        return this.#equation;

    }
    
    Valid(): boolean {
        
        return this.#stack_numbers.Count() === 1 && !this.#stack_operators.Count();

    }

    Value(): number {
        
        return this.#value;

    }

    Add(n: string) {

        this.#equation += ( this.#equation ? ' ' : '') + n; 

        switch (n) {

            case '+':
            case 'x':
            case '(':
                this.#stack_operators.Push(n);
                break;
            case ')':
                {
                    if (this.#stack_operators.Pop() !== '(') {
                        throw 'Invalid character set passed into equation stream';
                    }

                    if (this.#stack_numbers.Count() >= 2 &&
                    this.#operators[this.#stack_operators.Peek()]) {

                        this.#stack_numbers.Push(
                            this.#operators[this.#stack_operators.Pop()](
                            this.#stack_numbers.Pop(),
                            this.#stack_numbers.Pop()));

                    }                    
                }
                break;

            default:
                {
                    let n_parsed = parseInt(n);

                    if (isNaN(n_parsed)) {
                        throw 'Invalid character set passed into equation stream';
                    }

                    if (this.#stack_numbers.Count() &&
                    this.#operators[this.#stack_operators.Peek()]) {
                        
                        n_parsed = this.#operators[this.#stack_operators.Pop()](
                            this.#stack_numbers.Pop(), n_parsed);
                        
                    }
                    
                    this.#stack_numbers.Push(n_parsed);
                }
                break;

        }

        if (this.Valid()) {
            this.#value = this.#stack_numbers.Peek();
        }

    }

}