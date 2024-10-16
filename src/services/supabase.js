import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://smwzpyzvmwkyxsqrbpnz.supabase.co';

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtd3pweXp2bXdreXhzcXJicG56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyMDExNjIsImV4cCI6MjA0Mzc3NzE2Mn0.RTbh7U8cYPmymdD1SnDg6JVrpErfDQ6fpab7aAvBCAY";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;