interface Calculator {
    value: number,
    add?: (a: number, b: number) => number
}

const myCalc: Calculator = {
    value: 100,
    add: function(a: number, b: number) {
        return a+b+this.value
    }
}

const myCalC2: Calculator = {
    value: 200,
}

const res = myCalc.add?.apply(myCalC2, [10, 20])

console.log(res, 'res')


//Implementation of myApply

declare global {
    interface Function{
        myApply<T, A extends unknown[], R>(
            this: (...args: A) => R,
            thisArg: T,
            args?: A
        ): R
    }
}

Function.prototype.myApply = function<T, A extends unknown[], R>(
    this: (...args: A) => R,
    thisArg: T,
    args?: A
): R {
    if(typeof this !== 'function') {
        throw new TypeError('myApply must be called on a function');
    }
    if(args !== undefined && !Array.isArray(args)) {
        throw new TypeError('CreateListFromArrayLike called on non-object')
    }

    const context = thisArg === null || thisArg === undefined ? globalThis : Object(thisArg);

    const keyFn = Symbol('fn'); // unique key, need temporary property to attach function.

    (context as Record<PropertyKey, unknown>)[keyFn] = this;

    const result = (context as Record<PropertyKey, (...args: A) => R>)[keyFn](...args || ([] as unknown as A));

    return result;
}

const res2 = myCalc.add?.myApply(myCalC2, [20, 30])

console.log(res2, 'res2')