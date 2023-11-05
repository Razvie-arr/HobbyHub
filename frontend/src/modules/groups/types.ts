export interface Group {
    id: number;
    name: string;
    admin: {id: number; first_name: string; last_name: string};
    location?: {
        id: number;
        country: string;
        city: string;
        street_name: string;
        street_number: string;
        longitude: number;
        latitude: number;
    };
    capacity: number;
}