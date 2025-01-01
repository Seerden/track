ALTER TABLE item_templates ADD column user_id bigint REFERENCES users ON DELETE CASCADE;

ALTER TABLE field_templates ADD column user_id bigint REFERENCES users ON DELETE CASCADE;

ALTER TABLE field_values ADD column user_id bigint REFERENCES users ON DELETE CASCADE;

ALTER TABLE item_rows ADD column user_id bigint REFERENCES users ON DELETE CASCADE;

ALTER TABLE items ADD column user_id bigint REFERENCES users ON DELETE CASCADE;

ALTER TABLE log_templates ADD column user_id bigint REFERENCES users ON DELETE CASCADE;

ALTER TABLE logs ADD column user_id bigint REFERENCES users ON DELETE CASCADE;

