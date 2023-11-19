export interface User {
    id: number;
    role: string;
    email: string;
    password?: string;
    name?: string;
    surname?: string;
    city?: string;
    country?: string;
    phone?: string;
    profession?: string;
    companyInformation?: string;
    isActive?: boolean;
}
