import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://phksevdkcrkcuowizuht.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoa3NldmRrY3JrY3Vvd2l6dWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzM2NjksImV4cCI6MjA3MzAwOTY2OX0.kEHLBtKE1QFdAQZX0-nYAMIcWmg8DhpNh9WGh9lqagc'
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase ;