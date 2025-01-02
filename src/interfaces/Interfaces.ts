export default interface Product {
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





