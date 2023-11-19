import { Company } from "../../company/model/company.model";

export interface Equipment {
    name: string,
    description: string,
    type: EquipmentType,
    company: Company
}

export enum EquipmentType {
    Instrument = 0,
    Surgical,
    Sterile,
    Mask
}