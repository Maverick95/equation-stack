import Stack from './stack.js';

export default class EquationStack {

    constructor() {

        this.value = 0;
        this.stack_numbers = new Stack();
        this.stack_operators = new Stack();
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
            case '(':
                this.stack_operators.Push(n);
                break;
            case ')':
                {
                    if (this.stack_operators.Pop() !== '(') {
                        throw 'Invalid character set passed into equation stream';
                    }

                    if (this.stack_numbers.Count() >= 2 &&
                    this.operators[this.stack_operators.Peek()]) {

                        this.stack_numbers.Push(
                            this.operators[this.stack_operators.Pop()](
                            this.stack_numbers.Pop(),
                            this.stack_numbers.Pop()));

                    }                    
                }
                break;

            default:
                {
                    if (isNaN(parseInt(n))) {
                        throw 'Invalid character set passed into equation stream';
                    }

                    if (this.stack_numbers.Count() &&
                    this.operators[this.stack_operators.Peek()]) {
                        
                        n = this.operators[this.stack_operators.Pop()](
                            this.stack_numbers.Pop(), n);
                        
                    }
                    
                    this.stack_numbers.Push(n);
                }
                break;

        }

        if (this.Valid()) {
            this.value = this.stack_numbers.Peek();
        }

    }

}