import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ffcfpgtzwjxpowzogbpf.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmY2ZwZ3R6d2p4cG93em9nYnBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4MDQ4NzIsImV4cCI6MjA4MTM4MDg3Mn0.xvmUqSiPzoainhH8Y3KB-GBCf6LpUTtK8tUrq8l2zNY';
if (!supabaseKey) {
	throw new Error('Missing SUPABASE_KEY environment variable');
}
export const supabase = createClient(supabaseUrl, supabaseKey);
