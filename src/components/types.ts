export interface Spot {
    id: string;
    name: string;
    location: string;
    images: string[];
    description: string;
    distance?: string;
    openStatus?: boolean;
    rating: Rating;
    reviews: Review[];
    hours: Hours;
}

export interface Review {
    rating: Rating;
    comment: string;
    user: User;
}

export interface Rating {
    overall: number;
    atmosphere: number;
    comfort: number;
    quiet: number;
    seating: number;
}

export interface Date {
    year: number;
    month: number;
    day: number;
}

export interface Point {
    date: Date;
    truncated: boolean;
    day: number;
    hour: number;
    minute: number;
}

export interface Period {
    open: Point;
    close: Point;
}

export interface SpecialDay {
    date: Date;
    exceptionalHours: boolean;
}

export enum SecondaryHoursType {
    UNSPECIFIED = "Unspecified",
    DRIVE_THROUGH = "Drive-through",
    HAPPY_HOUR = "Happy hour", 
    DELIVERY = "Delivery",
    TAKEOUT = "Takeout",
    KITCHEN = "Kitchen",
    BREAKFAST = "Breakfast",
    LUNCH = "Lunch",
    DINNER = "Dinner",
    BRUNCH = "Brunch",
    PICKUP = "Pickup",
    ACCESS = "Access",
    SENIOR_HOURS = "Senior hours",
    ONLINE_SERVICE_HOURS = "Online service hours"
}

export interface Hours {
    periods: Period[];
    weekdayDescriptions: string[];
    secondaryHoursType?: SecondaryHoursType;
    specialDays?: SpecialDay[];
    nextOpenTime?: string;
    nextCloseTime?: string;
    openNow: boolean;
}

export interface Category {
    name: string;
}

export interface User {
    profilePicture: string;
    username: string;
    city: string;
}

export interface PageData {
    spots?: Spot[];
    mapSpots?: Spot[];
    recentSpots?: Spot[];
    serverRendered?: boolean;
}
