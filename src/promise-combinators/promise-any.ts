// Polyfill for AggregateError for older environments
class AggregateError extends Error {
    errors: any[]; // this is beacause in TS class we need to expicitly declare properties that will be assigned in the constructor
    
    constructor(errors: any[], message?: string) {
        super(message);
        this.errors = errors;
        this.name = 'AggregateError';
    }
}

function myPromiseAny<T>(promises: Promise<T>[]): Promise<T> {
    return new Promise((resolve, reject) => {
        if(promises.length === 0) {
            reject(new AggregateError([], 'All promises were rejected'));
            return;
        }

        let rejectionCount = 0;
        const errors: any[] = [];

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                errors[index] = err;
                rejectionCount++;
                
                if(rejectionCount === promises.length) {
                    reject(new AggregateError(errors, 'All promises were rejected'));
                }
            })
        })
    })
}

const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "two");
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(reject, 50, new Error("rejected early"));
});

const promise4 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, new Error("rejected lately"));
});

// Test with resolved promises - should return "two" (first to resolve)
myPromiseAny([promise1, promise2, promise3]).then((value) => {
    console.log(value); // "two"
})

// // Test with all rejected promises - should reject with AggregateError
// myPromiseAny([promise3, promise4]).catch((error) => {
//   console.log(error.message); // "All promises were rejected"
//   console.log(error.errors); // Array of all rejection errors
// });


