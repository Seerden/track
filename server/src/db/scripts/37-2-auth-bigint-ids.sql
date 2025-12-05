-- Alter the types for the better auth id fields from ints to bigints, so we
-- don't have to mess with our existing table definitions.
-- make sure to run this after the auth:migrate command, otherwise the tables won't exist.
alter table if exists auth.user alter column id type bigint;
alter table if exists auth.account 
   alter column id type bigint,
   alter column "userId" type bigint;
alter table if exists auth.verification alter column id type bigint;
alter table if exists auth.session 
   alter column id type bigint,
   alter column "userId" type bigint;