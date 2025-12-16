import { supabase } from '$lib/supabaseClient';

export async function load() {
    const { data: posts, error } = await supabase
        .from('posts')
        .select('title, slug, created_at, author, desc')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return { posts: [] };
    }else{
        console.log('Posts fetched successfully:', posts);
    }

    return { posts };
}