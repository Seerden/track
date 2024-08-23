create table if not exists tags_tags (
  parent_id serial not null,
  child_id serial not null,
  primary key (parent_id, child_id),
  foreign key (parent_id) references tags (tag_id),
  foreign key (child_id) references tags (tag_id),
  constraint ids_not_equal check (parent_id <> child_id)
);