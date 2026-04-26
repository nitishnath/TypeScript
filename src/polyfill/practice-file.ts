declare global {
    interface Array<T> {
        myMap<U>(
            callback: (value: T, index: number, array: T[]) => U,
            thisArg?: unknown
        ): U[];

        myFilter(
            callback: (value: T, index: number, array: T[]) => boolean,
            thisArg?: unknown
        ): T[];

        myReduce(
            callback: (acc: T, curr: T, index: number, array: T[]) => T
        ): T
    }
}