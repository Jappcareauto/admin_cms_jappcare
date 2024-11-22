import { MediaItemInterface } from "./MediaItemInterface"

export interface VehiculeInterface {
    name: string,
    description: string,
    garageId: string,
    vin: string,
    detail: {
        make: string,
        model: string,
        year: string,
        trim: string,
        transmission: string,
        driveTrain: string,
        power: string,
        bodyType: string,
        vehicleId: string,
        id: string,
        createdBy: string,
        updatedBy: string,
        createdAt: string,
        updatedAt: string
    },
    media: [
        {
            type: "EXTERIOR",
            source: "VEHICLE_DATABASES",
            vehicleId: string,
            productId: string,
            items: MediaItemInterface[],
            id: string,
            createdBy: string,
            updatedBy: string,
            createdAt: string,
            updatedAt: string
        }
    ]
}