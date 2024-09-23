alter table activities 
   add column is_task boolean not null default false,
   add column completed_at timestamp,
   add column completed boolean;