create table if not exists logbooks_tags (
   logbook_id integer not null references logbooks on delete cascade,
   tag_id integer not null references tags on delete cascade,
   user_id integer not null references users on delete cascade,
   created_at timestamp default now(),
   primary key (logbook_id, tag_id)
);