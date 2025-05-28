export interface Spot {
    id: string;
    name: string;
    location: string;
    image: string;
    description: string;
    distance: string;
    openStatus: boolean;
    rating: Rating;
}

export interface Rating {
    overall: number;
    atmosphere: number;
    comfort: number;
    quiet: number;
    seating: number;
}

export interface Category {
    name: string;
}

export interface User {
    profilePicture: string;
    username: string;
    city: string;
}
