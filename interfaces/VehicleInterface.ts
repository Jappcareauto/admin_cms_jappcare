export interface VehicleInterface {

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
            items: [
                {
                    sourceUrl: string,
                    capturedUrl: string,
                    type: "EXTERIOR",
                    mediaId: string,
                    fileId: string,
                    fileUrl: string,
                    id: string,
                    createdBy: string,
                    updatedBy: string,
                    createdAt: string,
                    updatedAt: string
                }
            ],
            id: string,
            createdBy: string,
            updatedBy: string,
            createdAt: string,
            updatedAt: string
        }
    ],
    id: string,
    createdBy: string,
    updatedBy: string,
    createdAt: string,
    updatedAt: string

}