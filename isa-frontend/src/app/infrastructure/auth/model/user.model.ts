export interface User {
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
    Employee = 0,
    companyadministrator,
    systemadministrator
}