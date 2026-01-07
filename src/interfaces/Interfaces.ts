export interface Product {
    // Original mock data properties
    id: string;
    name: string;
    category: string;
    rating: number;
    reviews: string;
    price: {
        amount: number;
        currency: string;
    };
    image?: string;
    description: string;
    stockQuantity: number;
    active: boolean;
    media: {
        id: string;
        type: string;
        source: string;
        items: Array<{
            sourceUrl: string;
            capturedUrl: string;
            type: string;
            mediaId: string | null;
            fileId: string | null;
            fileUrl: string | null;
            id: string;

        }>;
    };

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

export interface ServiceData {
    title: string;
    description: string;
    serviceCenterId: string;
    definition: string;
    id: string;
}

// export interface Chatroom {
//     id: string;
//     name: string;
//     participantIds: string[];
//     createdBy: string | null;
//     updatedBy: string | null;
//     createdAt: string;
//     updatedAt: string;
// }

export interface Chatroom {
  id: string;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  name: string | null;
  appointmentDTO: AppointmentDTO;
  participantIds: string[];
}

export interface AppointmentDTO {
  id: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  date: string;
  locationType: "SERVICE_CENTER" | string;
  note: string;
  location: Location;
  serviceId: string;
  serviceCenterId: string;
  diagnosesToMake: string[] | null;
  diagnosesMade: string[] | null;
  vehicleId: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | string;
  fileIds: string[] | null;
}

export interface Location {
  id: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
}



export interface Roles {
    id: number;
    definition: string;
    expired: boolean;

}

export interface AppointmentInterface {
    id: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    date: string;
    locationType: string;
    note?: string;
    timeOfDay: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

    service: {
        id: string;
        createdBy: string | null;
        updatedBy: string | null;
        createdAt: string;
        updatedAt: string;
        title: string;
        description: string | null;
        serviceCenterId: string | null;
        definition: string;
    };

    serviceCenter: {
        id: string;
        createdBy: string | null;
        updatedBy: string | null;
        createdAt: string;
        updatedAt: string;
        name: string;
        ownerId: string | null;
        location: {
            id: string;
            createdBy: string;
            updatedBy: string;
            createdAt: string;
            updatedAt: string;
            latitude: number;
            longitude: number;
            name: string;
            description: string;
        };
        category: string;
        imageId: string | null;
        imageUrl: string | null;
        available: boolean;
    };

    vehicle: {
        id: string;
        createdBy: string | null;
        updatedBy: string | null;
        createdAt: string;
        updatedAt: string;
        name: string;
        description: string | null;
        garageId: string | null;
        vin: string;
        registrationNumber: string | null;
        imageUrl: string | null;
        make: string | null ;
        model: string | null ;
        trim: string | null;
        year: string | null ;

        detail: {
            id: string;
            createdBy: string | null;
            updatedBy: string | null;
            createdAt: string;
            updatedAt: string;
            make: string;
            model: string;
            year: string;
            trim: string;
            vehicleType: string | null;
            transmission: string | null;
            driveTrain: string | null;
            power: string | null;
            bodyType: string | null;
            manufacturer: string | null;
            manufacturerRegion: string | null;
            manufacturerCountry: string | null;
            manufacturerPlantCity: string | null;
            restraint: string | null;
            engineSize: string | null;
            engineDescription: string | null;
            engineCapacity: string | null;
            dimensions: string | null;
            vehicleId: string | null;
        };

        media: {
            id: string | null;
            createdBy: string | null;
            updatedBy: string | null;
            createdAt: string | null;
            updatedAt: string | null;
            type: string | null;
            source: string | null;
            items: Array<{
                sourceUrl: string;
                type: string;
            }>;
            mainItemUrl: string | null;
        };
    };
}


// User interface for the fetched accounts
export interface Users {
    id: string;
    name: string;
    email: string;
    date: string;
    createdAt: string;
    updatedAt: string;
    status: 'Users' | 'Service Providers';
    verified: boolean;
}

// Service interface for API data
export interface Service {
    id: string;
    title: string;
    description?: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}



export interface ServiceCenterRequest {
    name: string;
    ownerId: string;
    createdBy: string;
    updatedBy: string;
    location: {
        id?: string;
        latitude: number;
        longitude: number;
        name: string;
        description: string;
    };
    category: string;
    available: boolean;
}

export interface ServiceProviderData {
    id?: string | number;
    name: string;
    description?: string;
    location: {
        id?: string;
        latitude: number;
        longitude: number;
        name: string;
        description: string;
    };
    category: string;
    available: boolean;
    owner?: {
        id: string;
        name: string;
        email: string;
    };
    rating?: number;
    images?: string[];
    services?: string[];
}