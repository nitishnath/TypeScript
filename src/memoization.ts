//Single Argument
function singleValueMemoization(fn: (num: number) => number) {
    const cache: Record<number, number> = {}

    return function (num: number): number {
        if (num in cache) {
            console.log('Return the result from cache')
            return cache[num]
        }

        console.log('calculating the result')
        const result = fn(num);
        cache[num] = result;
        return result;
    }
}

const square = (val: number): number => {
    return val * val
}

const cachedData = singleValueMemoization(square)

// console.time();
// console.log(cachedData(5));
// console.timeEnd()

// console.time();
// console.log(cachedData(5));
// console.timeEnd()


// console.time();
// console.log(cachedData(6));
// console.timeEnd()

// let start = Date.now();
// console.log(cachedData(5));
// console.log("Time", Date.now() - start)

// start = Date.now();
// console.log(cachedData(5));
// console.log("Time", Date.now() - start)


//Generic with multiple arguments
// function multiArgsMemoization<T extends (...args: any[]) => any>(fn: T){
//     let cache = new Map<string, ReturnType<T>>(); //ReturnType<T> values are the return type of the input function.

//     return function (...args: Parameters<T>): ReturnType<T> {
//         const key = JSON.stringify(args);

//         if(cache.has(key)) {
//             console.log('Result return from cache');
//             return cache.get(key)!
//         }

//         console.log('Calculating the result');
//         const result = fn(...args);
//         cache.set(key, result);
//         return result;
//     }
// }

// const addSlowMulti = (num1: number, num2: number, ...args: number[]): number => {
//     const argRes = args.reduce((acc, curr) => acc + curr, 0)
//     for(let i = 0; i < 1e9; i++) {}
//     return num1 + num2 + argRes;
// }

// const cachedData = multiMemo(addSlowMulti);

// let start = Date.now()
// console.log(cachedData(4,5,7));
// console.log('TIme: ', Date.now() - start)

// start = Date.now()
// console.log(cachedData(4,5,7));
// console.log('TIme: ', Date.now() - start)





// Async memoization

let count = 0

function asyncMemoization<T extends (...args: any[]) => Promise<any>>(fn: T) {
    let cache = new Map<string, Promise<any>>();

    return function (...args: Parameters<T>): ReturnType<T> {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            console.log('Result return from cache');
            return cache.get(key)! as ReturnType<T>;
        }

        count++;
        const result = fn(...args);
        cache.set(key, result);
        return result as ReturnType<T>;
    }
}

async function fetchData(id: number): Promise<string> {
    console.log('Calling API');
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`user ${id}`)
        }, 1000)
    })
}

const memoizedFetch = asyncMemoization(fetchData);

// Test the async memoization
// memoizedFetch(1).then(result => console.log(result));
// memoizedFetch(1).then(result => console.log(result)); // Should return from cache
// memoizedFetch(2).then(result => {
//     console.log(result)
//     console.log(count, 'count')
// }); // Should call API again

// Test the async memoization
memoizedFetch(1).then(data => console.log(data));

setTimeout(() => {
    memoizedFetch(1).then(data => {
        console.log(data);
        console.log(count, 'count');
    });
}, 2000);

setTimeout(() => {
    memoizedFetch(2).then(data => {
        console.log(data);
        console.log(count, 'count');
    });
}, 3000);