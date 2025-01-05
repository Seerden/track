CREATE TABLE IF NOT EXISTS recurrences (
   recurrence_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   user_id bigint NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
   interval integer NOT NULL CHECK(interval > 0),
   interval_unit varchar(32) NOT NULL,
   frequency integer NOT NULL CHECK(frequency > 0),
   start_timestamp timestamptz NOT NULL,
   end_timestamp timestamptz CHECK(
      end_timestamp IS NULL OR end_timestamp > start_timestamp
   ),
   created_at timestamp DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS occurrences (
   occurrence_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   recurrence_id bigint NOT NULL REFERENCES recurrences ON DELETE CASCADE,
   user_id bigint NOT NULL REFERENCES users ON DELETE CASCADE,
   activity_id bigint NOT NULL REFERENCES activities ON DELETE CASCADE,
   divergence_count integer NOT NULL CHECK(divergence_count > 0),
   divergence_kind varchar(32) NOT NULL,
   offset_milliseconds bigint
);

ALTER TABLE activities 
ADD column IF NOT EXISTS recurrence_id bigint references recurrences,
ADD column IF NOT EXISTS occurrence int check(occurrence >= 0);