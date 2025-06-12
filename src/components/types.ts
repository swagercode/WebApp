export interface Spot {
    id: string;
    name: string;
    location: string;
    images: string[];
    description: string;
    distance?: string;
    openStatus?: boolean;
    rating: Rating;
    hours: Hours;
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
    SECONDARY_HOURS_TYPE_UNSPECIFIED = "SECONDARY_HOURS_TYPE_UNSPECIFIED",
    DRIVE_THROUGH = "DRIVE_THROUGH",
    HAPPY_HOUR = "HAPPY_HOUR",
    DELIVERY = "DELIVERY",
    TAKEOUT = "TAKEOUT",
    KITCHEN = "KITCHEN",
    BREAKFAST = "BREAKFAST",
    LUNCH = "LUNCH",
    DINNER = "DINNER",
    BRUNCH = "BRUNCH",
    PICKUP = "PICKUP",
    ACCESS = "ACCESS",
    SENIOR_HOURS = "SENIOR_HOURS",
    ONLINE_SERVICE_HOURS = "ONLINE_SERVICE_HOURS"
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
