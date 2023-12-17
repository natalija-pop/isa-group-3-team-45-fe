import { Company } from "./company.model";

export interface Equipment {
    id?: number,
    name: string,
    description: string,
    type: EquipmentType,
    quantity: number,
    reservedQuantity: number,
    companyId: number,
    company?: Company
}

export enum EquipmentType {
    Instrument = 0,
    Surgical,
    Sterile,
    Mask
}