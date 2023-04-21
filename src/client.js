import { createClient } from "@supabase/supabase-js";
const URL = 'https://ehjvjgxgsoohtxygykqd.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoanZqZ3hnc29vaHR4eWd5a3FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEzMjgyNDcsImV4cCI6MTk5NjkwNDI0N30.-8cib51qHW5ANVzeF-Vqv4BR_S1Q9UjBfKlC0M-U6HI'

export const supabase = createClient(URL, API_KEY)