const arr = [[[3,5,6,[5,10, 'p']]]]

function flattenArr<T>(arr: (T | T[])[]): T[] {
    const output: T[] = [];

    for(let item of arr) {
        if(!Array.isArray(item)) {
            if(!item) continue;
            output.push(item)
        } else {
            output.push(...flattenArr(item))
        }
    }
    return output;
}

console.log(flattenArr(arr))