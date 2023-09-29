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
var _Stack_last, _Stack_count;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
class Stack {
    constructor() {
        _Stack_last.set(this, void 0);
        _Stack_count.set(this, void 0);
        __classPrivateFieldSet(this, _Stack_count, 0, "f");
    }
    Push(value) {
        var _a;
        const stack_new = {
            value: value,
            next: __classPrivateFieldGet(this, _Stack_last, "f")
        };
        __classPrivateFieldSet(this, _Stack_last, stack_new, "f");
        __classPrivateFieldSet(this, _Stack_count, (_a = __classPrivateFieldGet(this, _Stack_count, "f"), _a++, _a), "f");
    }
    Pop() {
        var _a;
        if (__classPrivateFieldGet(this, _Stack_last, "f")) {
            const { value, next } = __classPrivateFieldGet(this, _Stack_last, "f");
            __classPrivateFieldSet(this, _Stack_last, next, "f");
            __classPrivateFieldSet(this, _Stack_count, (_a = __classPrivateFieldGet(this, _Stack_count, "f"), _a--, _a), "f");
            return value;
        }
        return undefined;
    }
    Empty() {
        while (__classPrivateFieldGet(this, _Stack_last, "f")) {
            this.Pop();
        }
    }
    Peek() {
        if (__classPrivateFieldGet(this, _Stack_last, "f")) {
            return __classPrivateFieldGet(this, _Stack_last, "f").value;
        }
        return undefined;
    }
    Count() {
        return __classPrivateFieldGet(this, _Stack_count, "f");
    }
}
exports.Stack = Stack;
_Stack_last = new WeakMap(), _Stack_count = new WeakMap();
