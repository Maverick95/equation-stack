export default class Stack {

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
            this.Pop();
        }

    }

    Peek() {

	    return this.last && this.last.value;

    }

    Count() {

        return this.count;

    }

}