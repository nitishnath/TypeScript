
// declaration merging
// It means that I want to modify a type that exists in the global scope.
// Now TS will now that we added myReduce to Array.prototype at compile time.

declare global {
    interface Array<T> {
        myReduce(callback: (acc: T, curr: T, index: number, array: T[]) => T): T;
        myReduce<U>(callback: (acc: U, curr: T, index: number, array: T[]) => U, initialValue?: U): U
    }
}

Array.prototype.myReduce = function<T, U>(
    callback: (acc: U, curr: T, index: number, array: T[]) => U,
    initialValue?: U
): U {
    if (this == null) throw new TypeError('this is null or undefined');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    const arr = Object.prototype.toString.call(this) === '[object Array]' ? this as T[] : Array.from(this);
    
    // Edge case: empty array with no initial value(TypeError)
    if (arr.length === 0 && initialValue === undefined) {
        throw new TypeError('Reduce of empty array with no initial value');
    }

    let acc: U;
    let startIndex: number;

    // initial value provided --> acc starts as initial value and loop from index 0
    if (initialValue !== undefined) {
        acc = initialValue;
        startIndex = 0;
    } else {
        // No initial value --> acc starts as first element of arr and loop start from index 1
        acc = arr[0] as unknown as U;
        startIndex = 1;
    }

    for (let i = startIndex; i < arr.length; i++) {
        if (Object.prototype.hasOwnProperty.call(arr, i)) {
            acc = callback(acc, arr[i], i, arr);
        }
    }

    return acc;
}

// Test the implementation
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.myReduce((acc, curr) => acc + curr, 0);
console.log(sum, 'sum with initial value');

const sum2 = numbers.myReduce((acc, curr) => acc + curr);
console.log(sum2, 'sum without initial value');