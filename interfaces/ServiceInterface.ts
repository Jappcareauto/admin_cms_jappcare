import { DefinitionEnum } from "@/enums/definitionEnum"

export interface ServiceInterface {
    title: string,
    description: string,
    definition: DefinitionEnum | string,
    serviceCenter: string | null,
    serviceCenterId: string | null,
    id: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    createdBy: string | null,
    updatedBy: string | null,
}