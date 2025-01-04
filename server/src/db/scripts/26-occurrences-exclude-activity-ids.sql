ALTER TABLE occurrences
ADD column excluded_activity_ids bigint[] DEFAULT ARRAY[]::bigint[];