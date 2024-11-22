import { CategoryServiceCenterEnum } from "@/enums/categoryServiceCenterEnum"

export interface ServiceCenterInterface {
    name: string,
    ownerId: string,
    location: {
        latitude: number,
        longitude: number,
        description: string,
        id: string,
        createdBy: string | null,
        updatedBy: string | null,
        createdAt: string | null,
        updatedAt: string | null
    },
    category: CategoryServiceCenterEnum | string,
    id: string | null,
    createdBy: string | null,
    updatedBy: string | null,
    createdAt: string | null,
    updatedAt: string | null
}