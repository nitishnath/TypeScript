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


//Generic with multiple arguments
// function multiArgsMemoization<T extends (...args: any[]) => any>(fn: T){
//     let cache = new Map<string, ReturnType<T>>();

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

// const addNum = (a: number, b: number, ...args: number[]): number => {
//     const res = args.reduce((acc, curr) => acc + curr, 0)
//     return a + b + res
// }

// const multiArgsCachedResult = multiArgsMemoization(addNum);

// console.time();
// console.log(multiArgsCachedResult(5, 10, 15, 20));
// console.timeEnd()

// console.time();
// console.log(multiArgsCachedResult(5, 10, 14, 20));
// console.timeEnd()





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

memoizedFetch(1)
    .then(data => {
        console.log(data)
    }).then(() => {
        // Wait a bit then call with same data - should return from cache
        setTimeout(() => {
            memoizedFetch(1).then(data => {
                console.log(data)
                console.log(count, 'count')
            })
        }, 2000)
    }).then(() => {
        setTimeout(() => {
            memoizedFetch(2).then(data => {
                console.log(data)
                console.log(count, 'count')
            })
        }, 3000)
    })