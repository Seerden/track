alter table activities 
   add column is_task boolean not null default false,
   add column completion_timestamp timestamp,
   add column completed boolean;