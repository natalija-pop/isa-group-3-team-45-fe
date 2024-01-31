import { Position } from "./position.model";
export interface ActivationMessage{
    startPoint: Position;
    endPoint: Position;
    frequency: number;
}