
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dkteddtfsppevqotrrgr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrdGVkZHRmc3BwZXZxb3RycmdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4NzU0OTcsImV4cCI6MjA1NTQ1MTQ5N30.di5Ki1EAiZcm8aj3hw61L-5wQi3iRCmqM5JgHgTB48A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
