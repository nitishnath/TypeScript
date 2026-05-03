interface Calculator {
    value: number,
    add: (a: number, b: number) => number
}

const calc: Calculator = {
    value: 100,
    add: function(a: number, b: number) {
        return a + b + this.value
    }
}

interface myCalculator {
    value: number;
}

const myCalc: myCalculator = {
    value: 100
}

const res = calc.add.call(myCalc, 5, 10)
console.log(res, 'res')

//Implementation of call polyfill

declare global {
    interface Function {
        myCall<T, A extends unknown[], R> (
            this: (...args: A) => R,
            thisArg: T,
            ...args: A): R
    }
}

Function.prototype.myCall = function<T, A extends unknown[], R>(
    this: (...args: A) => R,
    thisArg: T,
    ...args: A
): R {
    if(typeof this !== 'function') throw new TypeError('myCall must be called on a function');

    const context = thisArg === null || thisArg === undefined ? globalThis : Object(thisArg);

    // unique key, need temporary property to attach function.
    const fnKey = Symbol('fn');

    // Attach function temporarily onto the object
    (context as Record<PropertyKey, unknown>)[fnKey] = this;

    //invoke
    let result = (context as Record<PropertyKey, (...args:A) => R>)[fnKey](...args);

    // cleanup
    delete (context as Record<PropertyKey, unknown>)[fnKey];

    return result;
}

const res2 = calc.add.myCall(myCalc, 20, 50)
console.log(res2, 'res2')
