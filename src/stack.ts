type Node<T> = {
  value: T,
  next?: Node<T>
};

export class Stack<T> {

  #last?: Node<T>;
  #count: number;

  constructor() {

      this.#count = 0;

  }

  Push(value: T): void {

      const stack_new: Node<T> = {
          value: value,
          next: this.#last
      };

      this.#last = stack_new;
      this.#count++;
  }

  Pop(): T {

      if (this.#last) {

          const {value, next} = this.#last;
          this.#last = next;
          this.#count--;
          return value;

      }

      return undefined as T;

  }

  Empty(): void {

      while(this.#last) {
          this.Pop();
      }

  }

  Peek(): T {

    if (this.#last) {
        return this.#last.value;
    }

    return undefined as T;

  }

  Count(): number {

      return this.#count;

  }

}