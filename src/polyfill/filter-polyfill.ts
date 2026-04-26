// export {}
// declare global {
//     interface Array<T> {
//         myFilter(
//             callback: (value: T, index: number, array: T[]) => boolean,
//             thisArg?: unknown
//         ): T[]
//     }
// }

// Array.prototype.myFilter = function<T> (
//     callback: (value: T, index: number, array: T[]) => boolean,
//     thisArg?: unknown
// ): T[] {

//     if(this == null) throw new TypeError('this is null or undefined')
    
//     if(typeof callback !== 'function') throw new TypeError(callback + 'is not a function');

//     const arr = this as T[];
//     const result: T[] = [];

//     for(let i = 0; i < arr.length; i++) {
//         if(Object.prototype.hasOwnProperty.call(arr, i)) {
//             if(callback.call(thisArg, arr[i], i, arr)) {
//                 result.push(arr[i])
//             }
//         }
//     }

//     return result;
// }

// const newFilteredArr = [2,4,5,7,8].myFilter((el: number) => el % 2 === 0)

// console.log(newFilteredArr, 'newFilteredArr')


// Practice Filter Polyfill
declare global{
    interface Array<T> {
        myPracticeFilter(
            callback: (value: T, index: number, array: T[]) => boolean,
            thisArg?: unknown
        ): T[]
    }
}

Array.prototype.myPracticeFilter = function<T> (
    callback: (value: T, index: number, array: T[]) => boolean,
    thisArg?: unknown
): T[] {
    if(this == null) throw new TypeError('this is null or undefined');
    if(typeof callback !== 'function') throw new TypeError(callback + 'is not a function');

    const arr = Object.prototype.toString.call(this) === '[object Array]' ? this as T[] : Array.from(this);
    const result: T[] = [];

    for(let i = 0; i < arr.length; i++) {
        if(Object.prototype.hasOwnProperty.call(arr, i)) {
            if(callback.call(thisArg, arr[i], i, arr)){
                result.push(arr[i])
            }
        }
    }

    return result;
}

console.log(([4,7,8,,10, 11] as number[]).myPracticeFilter((el: number) => el % 2 === 0))