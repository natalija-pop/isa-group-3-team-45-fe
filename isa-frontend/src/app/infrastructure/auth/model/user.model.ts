export interface User {
    id: number;
    role: UserRole;
    email: string;
    password?: string;
    name?: string;
    surname?: string;
    isActivated?: boolean;
}

export interface CompanyAdmin{
    id: number;
    role: UserRole;
    email: string;
    password?: string;
    name?: string;
    surname?: string;
    isActivated?: boolean;
    companyId: number;
}

export interface Employee{
    id: number;
    role: UserRole;
    email: string;
    password?: string;
    name?: string;
    surname?: string;
    city?: string;
    country?: string;
    phone?: string;
    profession?: string;
    companyInformation?: string;
    isActivated?: boolean;
}


export enum UserRole {
    employee = 0,
    companyadministrator,
    systemadministrator
}