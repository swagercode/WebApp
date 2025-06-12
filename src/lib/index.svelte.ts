import type { Category, Rating, User } from "../components/types";

export const currentCategory: Category = $state({ name: "overall" });


export const user: User = {
    profilePicture: "default-user.png",
    username: "John Doe",
    city: "New York"
}

export function getCurrCategory(rating: Rating, category: string) {
    switch (category) {
        case "overall":
            return rating.overall;
        case "atmosphere":
            return rating.atmosphere;
        case "comfort":
            return rating.comfort;
        case "quiet":
            return rating.quiet;
        case "seating":
            return rating.seating;
    }
}

