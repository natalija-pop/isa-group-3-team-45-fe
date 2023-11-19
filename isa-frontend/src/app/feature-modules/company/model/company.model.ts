export interface Company {
    id: number,
    name: string,
    description: string,
    address: Address
}

export interface Address {
    street: string,
    number: number,
    city: string,
    country: string
}