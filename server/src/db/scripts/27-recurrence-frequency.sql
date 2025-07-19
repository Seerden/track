ALTER TABLE recurrences
DROP column IF EXISTS frequency,
ADD column IF NOT EXISTS frequency text CHECK(frequency IN ('numeric', 'calendar'));