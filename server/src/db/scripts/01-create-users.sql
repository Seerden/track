create table if not exists users (
   user_id serial unique not null primary key,
   username varchar(32) unique not null,
   password_hash text not null,
   created_at timestamp default now()
)