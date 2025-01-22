import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://yceuuooeloimtgxtjkpq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljZXV1b29lbG9pbXRneHRqa3BxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxNjY2NzMsImV4cCI6MjA1Mjc0MjY3M30.yoVgdKBkzuGvMJTf7B4co84txjBjK8t1XCiYaMmqayQ"; // Replace with your Supabase anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


