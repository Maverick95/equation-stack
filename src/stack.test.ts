let stack_test: Stack<number>;

import { Stack } from './stack';

describe('Stack operations function correctly', () => {

    beforeEach(() => {

        stack_test = new Stack();

    });

    it('Count of new stack is 0', () => {

        expect(stack_test.Count()).toEqual(0);

    });

    it('Pop/Peek/Count of new stack', () => {

        expect(stack_test.Pop()).toBeUndefined();
        expect(stack_test.Peek()).toBeUndefined();

    });

    it('Push/Pop operations', () => {

        const array_test = [1,2,3,4,5];
        
        array_test.forEach(m => { stack_test.Push(m); });

        expect(stack_test.Count()).toEqual(array_test.length);

        array_test.reverse().forEach(m => {
            
            expect(stack_test.Pop()).toEqual(m);

        });

        expect(stack_test.Count()).toEqual(0);

    });

    it('Peek/Empty operations', () => {

        const array_test = [1,2,3,4,5];

        array_test.forEach(m => { stack_test.Push(m); });

        expect(stack_test.Peek()).toEqual(array_test.reverse()[0]);
        expect(stack_test.Count()).toEqual(array_test.length);

        stack_test.Empty();

        expect(stack_test.Count()).toEqual(0);
        expect(stack_test.Pop()).toBeUndefined();
        expect(stack_test.Peek()).toBeUndefined();

    });

});
