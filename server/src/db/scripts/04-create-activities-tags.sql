create table if not exists activities_tags (
   user_id serial not null,
   activity_id serial not null,
   tag_id serial not null,

   constraint pk_activities_tags
      primary key (activity_id, tag_id),

   constraint fk_activities_tags_activities
      foreign key (activity_id)
      references activities(activity_id)
      on delete cascade,

   constraint fk_activities_tags_tags
      foreign key (tag_id)
      references tags(tag_id)
      on delete cascade
);