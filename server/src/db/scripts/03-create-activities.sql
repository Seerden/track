create table if not exists activities (
   activity_id serial unique not null primary key,
   user_id serial not null,
   name varchar(64) not null,
   description text,
   duration_milliseconds int,
   category_id serial, -- removed in 05.sql
   subcategory_id serial, -- removed in 05.sql
   started_at timestamp,
   ended_at timestamp,
   start_date date,
   end_date date,
   created_at timestamp default now(),

   constraint fk_activities_users
      foreign key (user_id)
      references users(user_id)
      on delete cascade,

   constraint fk_activities_categories
      foreign key (category_id)
      references tags(tag_id)
      on delete cascade,

   constraint fk_activities_subcategories
      foreign key (subcategory_id)
      references tags(tag_id)
      on delete cascade
);