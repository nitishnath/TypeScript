// export {} // makes the file external module
// declare global {
//     interface Array<T> {
//         myMap<U>(callback: (value: T, index: number, array: T[]) => U, thisArg?: unknown): U[];
//     }
// }

// //To understand this refer to TS copy
// Array.prototype.myMap = function <T, U>(
//     callBack: (value: T, index: number, array: T[]) => U,
//     thisArg?: unknown
// ): U[] {

//     if(this == null) throw new TypeError('This is null or undefined')
    
//     if(typeof callBack !== 'function') throw new TypeError (callBack + 'is not a function');

//     const arr = Object.prototype.toString.call(this) === '[Object Array]' ? this as T[] : Array.from(this);

//     const result: U[] = [];

//     for(let i = 0; i < arr.length; i++) {
//         if(Object.prototype.hasOwnProperty.call(arr, i)) {
//             result[i] = callBack.call(thisArg, arr[i], i, arr)
//         }
//     }

//     return result;
// }

// const newArr = [1,4,5];
// const myNewArr = newArr.myMap((x: number) => x * 2);

// console.log(myNewArr)


//Practice map polyfill

declare global {
    interface Array<T> {
        myMapPractice<U> (
            callback: (value: T, index: number, array: T[]) => U,
            thisArg?: unknown
        ): U[]
    }
}

Array.prototype.myMapPractice = function <T, U>(
    callback: (value: T, index: number, array: T[]) => U,
    thisArg?: unknown
): U[] {
    if(this == null) throw new TypeError('This is null or undefined')
    if(typeof callback !== 'function') throw new TypeError(callback + 'is not a function');

    const arr = Object.prototype.toString.call(this) === '[object Array]' ? this as T[] : Array.from(this);
    const result: U[] = [];

    for(let i = 0; i < arr.length; i++) {
        if(Object.prototype.hasOwnProperty.call(arr, i)) {
            result[i] = callback.call(thisArg, arr[i], i, arr)
        }
    }
    return result;
}

const arr = ([2,5, ,9] as number[]).myMapPractice((el: number) => el * 3)
console.log(arr, 'arr')