function myPromiseRace<T>(promises: Promise<T>[]): Promise<T> {
    return new Promise((resolve, reject) => {
        if(promises.length === 0) {
            // Promise.race with empty array never resolves or rejects
            return;
        }
        
        promises.forEach((promise) => {
            Promise.resolve(promise)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
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
  setTimeout(reject, 150, new Error("rejected early"));
});

// Test with resolved promises
myPromiseRace([promise1, promise2, promise3]).then((value) => {
  console.log(value); // "two" - faster promise wins
}).catch((err) => {
    console.error(err)
})

// Test with rejected promise
myPromiseRace([promise1, promise3]).catch((error) => {
  console.log(error.message); // "rejected early" - first to settle wins
});