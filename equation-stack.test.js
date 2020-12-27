import EquationStack from './equation-stack.js';

/*
Function below will turn, e.g.
'1 + 2 + ( 3 x 4 )'
into
[1 , '+' , 2 , '+' , '(' , 3 , 'x' , 4 , ')']
*/

const equation_transform = s => s.split('').filter(m => m !== ' ')
.map(m => m === '*' ? 'x' : m)
.map(m => [m, parseInt(m)])
.map(m => isNaN(m[1]) ? m[0] : m[1]);

/*
This is test data taken from the description for Advent of Code Day 18
https://adventofcode.com/2020/day/18
*/

const data_correct_test =
[
    {
        equation: '1 + 2 * 3 + 4 * 5 + 6',
        result: 71
    },
    {
        equation: '1 + (2 * 3) + (4 * (5 + 6))',
        result: 51
    },
    {
        equation: '2 * 3 + (4 * 5)',
        result: 26
    },
    {
        equation: '5 + (8 * 3 + 9 + 3 * 4 * 3)',
        result: 437
    },
    {
        equation: '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))',
        result: 12240
    },
    {
        equation: '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2',
        result: 13632
    }
];

/*
This is some data that is an incorrect equation, the process should either throw or return invalid.
*/

const data_incorrect_test =
[
    '1 + 3 * + 5', // Two operators together
    '(1 + 51) * 3', // Integer >= 10
    '1 + something + 5', // Clearly you're messing about here
    '+ 5 * (4 + 3) * 7', // Invalid syntax
    '1 + (2 * ', // Unfinished
    '2 * (2 + 3 + 5) + ', // Unfinished
    '3 +', // Unfinished
    '5 + (9 * (7 * (3 + 1) + 6' // Unfinished
];

// Main testing object.

let equation_stack_test = null;

beforeEach(() => {

    equation_stack_test = new EquationStack();

});

describe.each(
    data_correct_test.map(m => [m.equation, m.result]))('Correct equation %s = %i', (eq, r) => {

    it('Inserting equation details returns valid, correct result', () => {

        equation_transform(eq).forEach(e => { equation_stack_test.Add(e); });

        expect(equation_stack_test.Valid()).toEqual(true);
        expect(equation_stack_test.Value()).toEqual(r);

    });

});

describe.each(
    data_incorrect_test.map(m => [m]))('Incorrect equation %s', (eq) => {

        it('Inserting equation details throws error or returns invalid equation', () => {

            expect(
                (e => {

                    let result = null;

                    try {
                        e.forEach(f => { equation_stack_test.Add(f); });
                    }
                    catch (error) {
                        if (error === 'Invalid character set passed into equation stream') {
                            result = false;
                        }
                    }

                    if (result === null) {
                        result = equation_stack_test.Valid();
                    }

                    return result;
                })(equation_transform(eq))).toEqual(false);

        });

    });
