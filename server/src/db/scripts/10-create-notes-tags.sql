create table if not exists notes_tags (
   user_id serial not null references users(user_id),
   note_id serial not null references notes(note_id),
   tag_id serial not null references tags(tag_id),
   created_at timestamp default now(),
   primary key (note_id, tag_id)
);