ALTER TABLE IF EXISTS recurrences
ADD column IF NOT EXISTS weekdays text[] CHECK (
   weekdays <@ ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
),
ADD column IF NOT EXISTS monthdays int[] CHECK (
   0 < all(monthdays) AND 32 > all(monthdays)
),
ADD column IF NOT EXISTS edge_case_handling text CHECK (
   edge_case_handling IN ('skip', 'push', 'pull')
);
