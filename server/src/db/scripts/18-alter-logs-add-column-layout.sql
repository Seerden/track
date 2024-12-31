ALTER TABLE logs
ADD column layout jsonb DEFAULT '[]'::jsonb;