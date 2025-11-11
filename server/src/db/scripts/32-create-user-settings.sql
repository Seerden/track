
begin;

create table if not exists user_settings (
   user_id serial not null references users on delete cascade,
   disable_notifications boolean,
   primary key (user_id)
);

insert into user_settings (
   select user_id from users
) on conflict (user_id) do nothing;

commit;