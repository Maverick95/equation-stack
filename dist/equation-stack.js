"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EquationStack_value, _EquationStack_stack_numbers, _EquationStack_stack_operators, _EquationStack_equation, _EquationStack_operators;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquationStack = void 0;
const stack_1 = require("./stack");
class EquationStack {
    constructor() {
        _EquationStack_value.set(this, void 0);
        _EquationStack_stack_numbers.set(this, void 0);
        _EquationStack_stack_operators.set(this, void 0);
        _EquationStack_equation.set(this, void 0);
        _EquationStack_operators.set(this, void 0);
        __classPrivateFieldSet(this, _EquationStack_value, 0, "f");
        __classPrivateFieldSet(this, _EquationStack_stack_numbers, new stack_1.Stack(), "f");
        __classPrivateFieldSet(this, _EquationStack_stack_operators, new stack_1.Stack(), "f");
        __classPrivateFieldSet(this, _EquationStack_equation, '', "f");
        __classPrivateFieldSet(this, _EquationStack_operators, {
            '+': (x, y) => x + y,
            'x': (x, y) => x * y
        }, "f");
    }
    Reset() {
        __classPrivateFieldSet(this, _EquationStack_value, 0, "f");
        __classPrivateFieldGet(this, _EquationStack_stack_numbers, "f").Empty();
        __classPrivateFieldGet(this, _EquationStack_stack_operators, "f").Empty();
        __classPrivateFieldSet(this, _EquationStack_equation, '', "f");
    }
    Output() {
        return __classPrivateFieldGet(this, _EquationStack_equation, "f");
    }
    Valid() {
        return __classPrivateFieldGet(this, _EquationStack_stack_numbers, "f").Count() === 1 && !__classPrivateFieldGet(this, _EquationStack_stack_operators, "f").Count();
    }
    Value() {
        return __classPrivateFieldGet(this, _EquationStack_value, "f");
    }
    Add(n) {
        __classPrivateFieldSet(this, _EquationStack_equation, __classPrivateFieldGet(this, _EquationStack_equation, "f") + ((__classPrivateFieldGet(this, _EquationStack_equation, "f") ? ' ' : '') + n), "f");
        switch (n) {
            case '+':
            case 'x':
            case '(':
                __classPrivateFieldGet(this, _EquationStack_stack_operators, "f").Push(n);
                break;
            case ')':
                {
                    if (__classPrivateFieldGet(this, _EquationStack_stack_operators, "f").Pop() !== '(') {
                        throw 'Invalid character set passed into equation stream';
                    }
                    if (__classPrivateFieldGet(this, _EquationStack_stack_numbers, "f").Count() >= 2 &&
                        __classPrivateFieldGet(this, _EquationStack_operators, "f")[__classPrivateFieldGet(this, _EquationStack_stack_operators, "f").Peek()]) {
                        __classPrivateFieldGet(this, _EquationStack_stack_numbers, "f").Push(__classPrivateFieldGet(this, _EquationStack_operators, "f")[__classPrivateFieldGet(this, _EquationStack_stack_operators, "f").Pop()](__classPrivateFieldGet(this, _EquationStack_stack_numbers, "f").Pop(), __classPrivateFieldGet(this, _EquationStack_stack_numbers, "f").Pop()));
                    }
                }
                break;
            default:
                {
                    let n_parsed = parseInt(n);
                    if (isNaN(n_parsed)) {
                        throw 'Invalid character set passed into equation stream';
                    }
                    if (__classPrivateFieldGet(this, _EquationStack_stack_numbers, "f").Count() &&
                        __classPrivateFieldGet(this, _EquationStack_operators, "f")[__classPrivateFieldGet(this, _EquationStack_stack_operators, "f").Peek()]) {
                        n_parsed = __classPrivateFieldGet(this, _EquationStack_operators, "f")[__classPrivateFieldGet(this, _EquationStack_stack_operators, "f").Pop()](__classPrivateFieldGet(this, _EquationStack_stack_numbers, "f").Pop(), n_parsed);
                    }
                    __classPrivateFieldGet(this, _EquationStack_stack_numbers, "f").Push(n_parsed);
                }
                break;
        }
        if (this.Valid()) {
            __classPrivateFieldSet(this, _EquationStack_value, __classPrivateFieldGet(this, _EquationStack_stack_numbers, "f").Peek(), "f");
        }
    }
}
exports.EquationStack = EquationStack;
_EquationStack_value = new WeakMap(), _EquationStack_stack_numbers = new WeakMap(), _EquationStack_stack_operators = new WeakMap(), _EquationStack_equation = new WeakMap(), _EquationStack_operators = new WeakMap();
