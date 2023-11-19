export interface Company {
    name: string,
    description: string,
    address: Address,
    rating: number
}

export interface Address {
    street: string,
    number: number,
    city: string,
    country: string
}