import { json } from '@sveltejs/kit';
import { supabase } from '../../../../lib/supabase';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
    try {
        const { data: spot, error } = await supabase
            .from('spots')
            .select('*')
            .eq('id', params.id)
            .single();

        if (error) {
            throw error;
        }

        return json(spot);
    } catch (error) {
        console.error('Error fetching spot:', error);
        return json(
            { error: 'Spot not found' },
            { status: 404 }
        );
    }
};

export const PUT: RequestHandler = async ({ params, request }) => {
    try {
        const updateData = await request.json();
        
        const { data: updatedSpot, error } = await supabase
            .from('spots')
            .update(updateData)
            .eq('id', params.id)
            .select()
            .single();

        if (error) {
            throw error;
        }

        return json(updatedSpot);
    } catch (error) {
        console.error('Error updating spot:', error);
        return json(
            { error: 'Failed to update spot' },
            { status: 500 }
        );
    }
};

export const DELETE: RequestHandler = async ({ params }) => {
    try {
        const { error } = await supabase
            .from('spots')
            .delete()
            .eq('id', params.id);

        if (error) {
            throw error;
        }

        return json({ success: true });
    } catch (error) {
        console.error('Error deleting spot:', error);
        return json(
            { error: 'Failed to delete spot' },
            { status: 500 }
        );
    }
}; 