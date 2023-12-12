import { User } from "src/app/infrastructure/auth/model/user.model"

export interface Company {
    id: number,
    name: string,
    description: string,
    workingHours: WorkingHours,
    address: Address,
    rating: number
    admins?: User[],
    workCalendar?: Appointment[]
}

export interface Address {
    street: string,
    number: number,
    city: string,
    country: string
}

export interface WorkingHours{
    openingHours: string,
    closingHours: string,
    weekends: boolean
}

export interface Appointment{
    start: Date,
    duration: number,
    adminName: string,
    adminSurname: string,
    customerName?: string,
    customerSurname?: string
    companyId: number
}