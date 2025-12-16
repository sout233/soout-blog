import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ffcfpgtzwjxpowzogbpf.supabase.co';
const supabaseKey =
	'***REMOVED***';
if (!supabaseKey) {
	throw new Error('Missing SUPABASE_KEY environment variable');
}
export const supabase = createClient(supabaseUrl, supabaseKey);
