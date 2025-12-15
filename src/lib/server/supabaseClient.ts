import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ffcfpgtzwjxpowzogbpf.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseKey) {
	throw new Error('Missing SUPABASE_KEY environment variable');
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const supabase = createClient(supabaseUrl, supabaseKey);
