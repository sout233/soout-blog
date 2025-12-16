import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const { slug } = params;

    const { data: post, error: dbError } = await supabase
        .from('posts')
        .select('*') 
        .eq('slug', slug)
        .single(); 

    if (dbError || !post) {
        throw error(404, '文章未找到');
    }

    return { post };
}