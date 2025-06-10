import type { LayoutServerLoad } from './$types';
import { supabase } from '../lib/supabase';

export const load: LayoutServerLoad = async () => {
    try {
        const { data: recentSpots, error } = await supabase
            .from('spots')
            .select('id, name, location, rating')
            .order('created_at', { ascending: false })
            .limit(5);

        if (error) {
            throw error;
        }

        return {
            recentSpots: recentSpots || [],
            serverRendered: true
        };
    } catch (error) {
        console.error('Error loading layout data:', error);
        
        return {
            recentSpots: [],
            serverRendered: false
        };
    }
}; 