import { ServiceInterface } from "./ServiceInterface"
import { VehiculeInterface } from "./VehiculeInterface"

export interface AppointmentInterface {
    date: string,
    locationType: string,
    note: string,
    serviceId: string,
    vehicle: VehiculeInterface | null,
    service: ServiceInterface | null,
    vehicleId: string,
    status: string,
    id: string,
    createdBy: string,
    updatedBy: string,
    createdAt: string,
    updatedAt: string
}