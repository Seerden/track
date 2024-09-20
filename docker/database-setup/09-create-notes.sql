create table if not exists notes (
    note_id serial unique not null primary key,
    user_id serial not null references users(user_id),
    activity_id serial references activities(activity_id),
    title varchar(255) default null,
    content text not null,
    created_at timestamp default now(),
    date date
);

-- tweak actvity_id
alter table notes drop column activity_id;
alter table notes add column activity_id integer references activities(activity_id);