import type { PageServerLoad } from './$types';
import type { Spot } from '../../../components/types';
import { supabase } from '../../../lib/supabase';

export const load: PageServerLoad = async ({ params }) => {
    const spotId = params.id;
    
    try {
        const { data: spot, error } = await supabase
            .from('spots')
            .select('*')
            .eq('id', spotId)
            .single();
        
        if (error) {
            throw error;
        }
        
        return {
            spot: {
                id: spot.id,
                name: spot.name,
                location: spot.location,
                images: spot.images || [],
                description: spot.description,
                distance: spot.distance,
                openStatus: spot.open_status,
                rating: spot.rating
            } as Spot
        };
    } catch (error) {
        console.error('Error loading spot:', error);
        
        return {
            spot: {
                id: spotId,
                name: "Spot Not Found",
                images: [],
                description: "This spot could not be loaded from the database.",
                location: "Unknown",
                rating: {
                    overall: 0,
                    atmosphere: 0,
                    comfort: 0,
                    quiet: 0,
                    seating: 0,
                }
            } as Spot
        };
    }
}; 