import Stack from './stack.js';

export default class EquationStack {

    constructor() {

        this.value = 0;
        this.stack_numbers = new Stack();
        this.stack_operators = new Stack();
        this.combine_on_push = false;
        this.equation = '';
        this.operators = {
            '+': (x, y) => x + y,
            'x': (x, y) => x * y
        };

    }

    Output() {
        
        return this.equation;

    }
    
    Valid() {
        
        return this.stack_numbers.Count() === 1 && !this.stack_operators.Count();

    }

    Value() {
        
        return this.value;

    }

    Add(n) {

        this.equation += ( this.equation ? ' ' : '') + n; 

        switch (n) {

            case '+':
            case 'x':
                this.stack_operators.Push(n);
                break;

            case '(':
                this.combine_on_push = false;
                break;

            case ')':
                {
                    this.stack_numbers.Push(
                        this.operators[this.stack_operators.Pop()](
                            this.stack_numbers.Pop(),
                            this.stack_numbers.Pop()));
                }
                break;

            default:
                {
                    if (this.combine_on_push) {
                        n = this.operators[this.stack_operators.Pop()](
                            this.stack_numbers.Pop(), n);
                    }

                    this.stack_numbers.Push(n);
                    this.combine_on_push = true;
                }
                break;

        }

        if (this.Valid()) {
            this.value = this.stack_numbers.Peek();
        }

    }

}