export interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    rating?: number;
    description?: string;
    reviews?: Array<{
        rating: number;
        comment: string;
        user: string;
        date: string;
    }>;
}


export interface AddProduct {
    active: boolean;
    description: string;
    name: string;
    category: string;
    price: {
        amount: number;
        currency: string;
    };
    stockQuantity: number;
    id: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}


export interface NotificationData {
    notificationType: string;
    description?: string;
    recipientId: string;
    read: string;
    isRead: boolean;
    id?: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}


export interface OrderInterface {
    userId: string;
    totalPrice: {
        amount: number;
        currency: string;
    };
    items: {
        productId: string;
        productName: string;
        quantity: number;
        unitPrice: {
            amount: number;
            currency: string;
        };
    }[];
    description: string;
    date: string;
}






