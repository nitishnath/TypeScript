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

console.log(flattenArr(arr), 'arr')


const obj = {
  user: {
    name: "Nitish",
    address: {
      city: "Bangalore",
      pin: [560066, 560067, 560068, 'B', 'N']
    }
  }
};

//Output:
// {
//   "user.name": "Nitish",
//   "user.address.city": "Bangalore",
//   "user.address.pin": 560066
// }

function flattenObj<T extends Record<string, any>>(
    obj: T,
    parentKey: string = '',
    result: Record<string, any> = {}
): Record<string, any> {
    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        const value = obj[key];

        if (value === null || value === undefined) {
            result[newKey] = value;
        } else if (Array.isArray(value)) {
            value.forEach((item: any, index: number) => {
                result[`${newKey}.${index}`] = item;
            });
        } else if (typeof value === 'object') {
            flattenObj(value, newKey, result);
        } else {
            result[newKey] = value;
        }
    }

    return result;
}

console.log(flattenObj(obj, 'obj'))