create table if not exists habits (
   habit_id serial unique not null primary key,
   user_id serial not null references users(user_id),
   name varchar(64) not null,
   description text,
   start_timestamp timestamptz not null default now(),
   end_timestamp timestamptz,
   interval integer not null,
   frequency integer not null check(frequency > 0),
   interval_unit varchar(32) not null,
   created_at timestamp default now(),
   goal_type varchar(32) not null,
   goal_unit varchar(32),
   goal integer check(goal > 0)
);

create table if not exists habit_entries (
   habit_entry_id serial unique not null primary key,
   habit_id serial not null references habits(habit_id) on delete cascade,
   user_id serial not null references users(user_id),
   created_at timestamp default now(),
   date date not null,
   index integer not null check(index >= 0),
   value varchar(255) not null
);

create table if not exists habits_tags (
   user_id serial not null references users(user_id),
   habit_id serial not null references habits(habit_id) on delete cascade,
   tag_id serial not null references tags(tag_id),
   created_at timestamp default now(),
   primary key (habit_id, tag_id)
);