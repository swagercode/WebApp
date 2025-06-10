import type { PageServerLoad } from './$types';
import { supabase } from '../lib/supabase';

export const load: PageServerLoad = async () => {
    try {
        const { data: spots, error } = await supabase
            .from('spots')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        return {
            spots: spots || []
        };
    } catch (error) {
        console.error('Error loading spots:', error);
        
        return {
            spots: []
        };
    }
}; 