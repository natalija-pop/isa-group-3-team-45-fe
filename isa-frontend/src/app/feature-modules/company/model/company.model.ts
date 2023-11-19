import { User } from "src/app/infrastructure/auth/model/user.model"

export interface Company {
    id: number,
    name: string,
    description: string,
    address: Address,
    rating: number
    admins?: User[]
}

export interface Address {
    street: string,
    number: number,
    city: string,
    country: string
}