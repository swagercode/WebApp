import { json } from '@sveltejs/kit';
import { supabase } from '../../../lib/supabase';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    try {
        const { data: spots, error } = await supabase
            .from('spots')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        return json(spots);
    } catch (error) {
        console.error('Error fetching spots:', error);
        return json(
            { error: 'Failed to fetch spots' },
            { status: 500 }
        );
    }
};

export const POST: RequestHandler = async ({ request }) => {
    try {
        const spotData = await request.json();
        
        const { data: newSpot, error } = await supabase
            .from('spots')
            .insert(spotData)
            .select()
            .single();

        if (error) {
            throw error;
        }

        return json(newSpot, { status: 201 });
    } catch (error) {
        console.error('Error creating spot:', error);
        return json(
            { error: 'Failed to create spot' },
            { status: 500 }
        );
    }
}; 