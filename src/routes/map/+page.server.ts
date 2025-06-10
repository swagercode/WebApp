import type { PageServerLoad } from './$types';
import { supabase } from '../../lib/supabase';

export const load: PageServerLoad = async () => {
    try {
        const { data: spots, error } = await supabase
            .from('spots')
            .select('id, name, location, rating')
            .order('rating->>"overall"', { ascending: false });

        if (error) {
            throw error;
        }

        return {
            mapSpots: spots || []
        };
    } catch (error) {
        console.error('Error loading map spots:', error);
        
        return {
            mapSpots: []
        };
    }
}; 