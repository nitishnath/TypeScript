interface ResArr<T = any> {
    status: 'fulfilled' | 'rejected', 
    value?: T, 
    reason?: any
}

function myPromiseAllSettled<T>(promises: Promise<T>[]): Promise<ResArr<T>[]> {
    return new Promise((resolve) => {
        if (promises.length === 0) {
            resolve([])
            return;
        }

        const results: ResArr<T>[] = new Array(promises.length);
        let completed = 0;

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then((value) => {
                    results[index] = { status: 'fulfilled', value };
                })
                .catch((reason) => {
                    results[index] = { status: 'rejected', reason };
                })
                .finally(() => {
                    completed++;
                    if (completed === promises.length) {
                        resolve(results);
                    }
                });
        });
    });
}

const promise1 = Promise.resolve(3);
const promise2 = new Promise(resolve => setTimeout(resolve, 1000, 'Foo'));
const promise3 = Promise.resolve(42);

const rejectPromise = Promise.reject(new Error('Rejected'));
myPromiseAllSettled([promise1, promise2, rejectPromise, promise3])
    .then(results => console.log(results))
    // Output: [
    //   { status: 'fulfilled', value: 3 },
    //   { status: 'rejected', reason: Error: Rejected },
    //   { status: 'fulfilled', value: 42 }
    // ]