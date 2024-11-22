export interface ProductInterface {
    name: string,
    description: string,
    price: {
        amount: number,
        currency: string
    },
    stockQuantity: number,
    active: true,
    id: string,
    createdAt: string,
    updatedAt: string,
    createdBy: string,
    updatedBy: string
}