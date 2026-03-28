// Implement Promise.all

function myPromiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            resolve([]);
            return;
        }

        const results: T[] = new Array(promises.length);
        let completed = 0;

        promises.forEach((promise, index) => {
            //Here this Promise.resolve is required to handle both promises and non-promises value uniformly. 
            Promise.resolve(promise)
                .then((value) => {
                    results[index] = value;
                    completed++;
                    
                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch(reject);
        });
    });
}

// Test cases
const promise1 = Promise.resolve(3);
const promise2 = new Promise(resolve => setTimeout(() => resolve('foo'), 1000));
const promise3 = Promise.resolve(42);
const promise4 = Promise.resolve(48);

myPromiseAll([promise1, promise2, promise3])
    .then(results => console.log(results)) // [3, 'foo', 42]
    .catch(error => console.error(error));

// Test with rejection
// const rejectPromise = Promise.reject(new Error('Rejected'));
const rejectPromise = new Promise(reject => setTimeout(reject, 1000, new Error('rejected')))
myPromiseAll([promise1, rejectPromise, promise3])
    .then(results => console.log(results))
    .catch(error => console.error(error.message)); // 'Rejected'

//output:
// Rejected
// [ 3, 'foo', 42 ]

// setTimeout(() => {
//     Promise.all([promise1, promise3, promise4])
//     .then(res => console.log(res))
//     .catch(err => console.error(err))
// }, 2000)