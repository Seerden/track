create table if not exists tags (
   tag_id serial unique not null primary key,
   user_id serial not null,
   category_id serial,
   subcategory_id serial,
   name varchar(32) not null,
   created_at timestamp default now(),
   description text,

   constraint fk_tags_users
      foreign key (user_id)
      references users(user_id)
      on delete cascade,

   constraint fk_tags_categories
      foreign key (category_id)
      references tags(tag_id)
      on delete cascade,

   constraint fk_tags_subcategories
      foreign key (subcategory_id)
      references tags(tag_id)
      on delete cascade
);