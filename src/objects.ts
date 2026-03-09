interface Product {
    name: string;
    price: number;
    getDiscount: (percentage: number) => number
}

const macBook: Product = {
    name: 'Apple',
    price: 100000,
    getDiscount(percentage: number): number {
        return this.price * (percentage /100)
    }
}

console.log(macBook.getDiscount(20), 'qwe')