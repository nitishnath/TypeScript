function process(
    a: number,
    b: number,
    operation: (a: number, b: number)  => number
) : number {
    return operation(a, b)
}

console.log(process(5,2, (x,y) => x*y))