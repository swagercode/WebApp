import type { PageServerLoad } from './$types';
import type { Spot } from '../../../components/types';
// import { supabase } from '../../../lib/supabase';
import { SecondaryHoursType } from '../../../components/types';

const placeHolderSpot: Spot = {
    id: "placeholder-cafe",
    name: "The Cozy Corner Cafe",
    images: [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&auto=format&fit=crop&q=60"
    ],
    description: "A charming cafe with comfortable seating, free WiFi, and a quiet atmosphere perfect for studying or working. We serve specialty coffee, fresh pastries, and light meals throughout the day.",
    location: "123 Main Street, Downtown",
    rating: {
        overall: 4.2,
        atmosphere: 4.5,
        comfort: 4.3,
        quiet: 3.8,
        seating: 4.0
    },
    reviews: [
        {
            rating: {
                overall: 4.2,
                atmosphere: 4.5,
                comfort: 4.3,
                quiet: 3.8,
                seating: 4.0
            },
            comment: "I love this place! The coffee is great and the atmosphere is so cozy.",
            user: {
                profilePicture: "/common/default-user.png", 
                username: "John Doe",
                city: "New York"
            }
        },
        {
            rating: {
                overall: 4.2,
                atmosphere: 4.5,    
                comfort: 4.3,
                quiet: 3.8,
                seating: 4.0
            },
            comment: "I love this place! The coffee is great and the atmosphere is so cozy.",
            user: {
                profilePicture: "/common/default-user.png",
                username: "Jane Doe",
                city: "New York"
            }
        }
    ],
    hours: {
        periods: [
            {
                open: {
                    date: { year: 2024, month: 3, day: 18 },
                    truncated: false,
                    day: 1,
                    hour: 7,
                    minute: 0
                },
                close: {
                    date: { year: 2024, month: 3, day: 18 },
                    truncated: false,
                    day: 1,
                    hour: 20,
                    minute: 0
                }
            }
        ],
        weekdayDescriptions: [
            "Monday: 7:00 AM – 8:00 PM",
            "Tuesday: 7:00 AM – 8:00 PM",
            "Wednesday: 7:00 AM – 8:00 PM",
            "Thursday: 7:00 AM – 8:00 PM",
            "Friday: 7:00 AM – 9:00 PM",
            "Saturday: 8:00 AM – 9:00 PM",
            "Sunday: 8:00 AM – 6:00 PM"
        ],
        secondaryHoursType: SecondaryHoursType.BREAKFAST,
        specialDays: [
            {
                date: { year: 2024, month: 12, day: 25 },
                exceptionalHours: true
            }
        ],
        nextOpenTime: "2024-03-18T07:00:00Z",
        nextCloseTime: "2024-03-18T20:00:00Z",
        openNow: true
    }
};

// export const load: PageServerLoad = async ({ params }) => {
//     const spotId = params.id;
    
//     try {
//         const { data: spot, error } = await supabase
//             .from('spots')
//             .select('*')
//             .eq('id', spotId)
//             .single();
        
//         if (error) {
//             throw error;
//         }
        
//         return {
//             spot: {
//                 id: spot.id,
//                 name: spot.name,
//                 location: spot.location,
//                 images: spot.images || [],
//                 description: spot.description,
//                 distance: spot.distance,
//                 openStatus: spot.open_status,
//                 rating: spot.rating
//             } as Spot
//         };
//     } catch (error) {
//         console.error('Error loading spot:', error);
        
//         return {
//             spot: {
//                 id: spotId,
//                 name: "Spot Not Found",
//                 images: [],
//                 description: "This spot could not be loaded from the database.",
//                 location: "Unknown",
//                 rating: {
//                     overall: 0,
//                     atmosphere: 0,
//                     comfort: 0,
//                     quiet: 0,
//                     seating: 0,
//                 },
//                 hours: {
//                     periods: [],
//                     weekdayDescriptions: [
//                         "Monday: Closed",
//                         "Tuesday: Closed",
//                         "Wednesday: Closed",
//                         "Thursday: Closed",
//                         "Friday: Closed",
//                         "Saturday: Closed",
//                         "Sunday: Closed"
//                     ],
//                     openNow: false
//                 }
//             } as Spot
//         };
//     }
// }; 

export const load: PageServerLoad = async () => {
    return {
        spotName: placeHolderSpot.name,
        spotCity: placeHolderSpot.location.split(",")[1].trim(),
        spotRating: placeHolderSpot.rating,
        spotReviews: placeHolderSpot.reviews,
        spotHours: "8am - 5pm",
        spotImages: placeHolderSpot.images,
        openNow: placeHolderSpot.hours.openNow
    };
};