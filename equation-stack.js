class Stack {

    constructor() {

        this.last = null;
        this.count = 0;

    }

    Push(value) {

        let stack_new = {
            value: value,
            next: this.last
        };

        this.last = stack_new;
        this.count++;
    }

    Pop() {

        if (this.last) {

            let {value, next} = this.last;
            this.last.next = null;
            this.last = next;
            this.count--;
            return value;

        }

        return null;

    }

    Empty() {

        while(this.last) {
            this.pop();
        }

    }

    Peek() {

	return this.last && this.last.value;

    }

    Count() {

        return this.count;

    }

}

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

    Output = () => this.equation;
    
    Valid = () => this.stack_numbers.Count() === 1 && !this.stack_operators.Count();

    Value = () => this.value;

    Add = (n) => {

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

    };

}