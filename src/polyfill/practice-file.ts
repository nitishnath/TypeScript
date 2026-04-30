declare global {
    interface Array<T> {
        myMap<U>(
            callback: (value: T, index: number, array: T[]) => U,
            thisArg?: unknown
        ): U[];

        myFilter(
            callback: (value: T, index: number, array: T[]) => boolean,
            thisArg?: unknown
        ): T[];

        myReduce(
            callback: (acc: T, curr: T, index: number, array: T[]) => T
        ): T;
        myReduce<U> (
            callback: (acc: U, curr: T, ondex: number, array: T[]) => U,
            initialValue?: U
        ): U
    }
}

// MyMap polyfill
Array.prototype.myMap = function<T, U>(
    callback: (value: T, index: number, array: T[]) => U,
    thisArg?: unknown
): U[] {
    if(this == null) throw new TypeError('this is null or undefined');
    if(typeof callback !== 'function') throw new TypeError(callback +  'is not a function');

    const arr = Object.prototype.toString.call(this) === '[object Array]' ? this as T[] : Array.from(this);
    const result: U[] = [];

    for(let i = 0; i < arr.length; i++) {
        if(Object.prototype.hasOwnProperty.call(arr, i)) {
            result[i] = callback.call(thisArg, arr[i], i, arr)
        }
    }

    return result;
}

console.log([3,6,7,8].myMap((el: number) => el * 3))
console.log(([3,6, ,8] as number[]).myMap((el: number) => el * 3))

//MyFilter polyfill
Array.prototype.myFilter = function<T>(
    callback: (value: T, index: number, array: T[]) => boolean,
    thisArg?: unknown
): T[] {
    if(this == null) throw new TypeError('this is null or undefined');
    if(typeof callback !== 'function') throw new TypeError(callback +  'is not a function');

    const arr = Object.prototype.toString.call(this) === '[object Array]' ? this as T[] : Array.from(this);
    const result : T[] = [];
    
    for(let i = 0; i < arr.length; i++) {
        if(Object.prototype.hasOwnProperty.call(arr, i)) {
            if(callback.call(thisArg, arr[i], i, arr)) {
                result.push(arr[i])
            }
        }
    }
    return result;
}

console.log([3,6,8,10].myFilter((el: number) => el % 2 === 0))


// MyReduce polyfill
Array.prototype.myReduce = function<T, U> (
    callback: (acc: U, curr: T, index: number, array: T[]) => U,
    initialValue?: U
): U {
    if(this == null) throw new TypeError('this is null or undefined');
    if(typeof callback !== 'function') throw new TypeError(callback +  'is not a function');

    const arr = this as T[];

    if(arr.length === 0 && initialValue === undefined) {
        throw new TypeError('Reduce of empty array with no initial value');
    }

    let acc: U;
    let startIndex: number;

    if(initialValue !== undefined) {
        acc = initialValue;
        startIndex = 0;
    } else {
        acc = arr[0] as unknown as U;
        startIndex = 1;
    }

    for(let i = startIndex; i < arr.length; i++) {
        if(Object.prototype.hasOwnProperty.call(arr, i)) {
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