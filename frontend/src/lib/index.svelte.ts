import type { Category, User } from "../components/types";

export const currentCategory: Category = $state({ name: "overall" });


export const user: User = {
    profilePicture: "profile.jpg",
    username: "John Doe",
    city: "New York"
}
