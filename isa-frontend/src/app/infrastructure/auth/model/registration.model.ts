export interface Registration {
    email: string,
    name: string,
    surname: string,
    password: string,
    city: string,
    country: string, 
    phone: string,
    profession: string,
    companyInformation: string,
    role: UserRole,
    isActivated: boolean
}

export enum UserRole {
    Employee = 0,
    CompanyAdministrator,
    SystemAdministrator
  }

