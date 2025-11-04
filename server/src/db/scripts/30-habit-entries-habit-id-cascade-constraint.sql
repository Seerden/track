-- tags
begin;
   alter table tags
   add constraint fk_tags_users
      foreign key (user_id)
      references users(user_id)
      on delete cascade;
commit;

-- activities
begin;
   alter table activities
   add constraint fk_activities_users
      foreign key (user_id)
      references users(user_id)
      on delete cascade;
commit;



-- habits
begin;
   alter table habits
   add constraint fk_habits_users
      foreign key (user_id)
      references users(user_id)
      on delete cascade;
commit;

-- habit_entries
begin;
   alter table habit_entries
   add constraint fk_habit_entries_habit_id
      foreign key (habit_id) 
      references habits(habit_id) 
      on delete cascade,
   add constraint fk_habit_entries_user_id
      foreign key (user_id)
      references users(user_id)
      on delete cascade;
commit;

-- activities_tags
begin;
   alter table activities_tags
   add constraint fk_activities_tags_activities
      foreign key (activity_id)
      references activities(activity_id)
      on delete cascade,

   add constraint fk_activities_tags_tags
      foreign key (tag_id)
      references tags(tag_id)
      on delete cascade;
commit;

-- tags_tags
begin;
   alter table tags_tags
   add constraint fk_tags_tags
      foreign key (parent_id)
      references tags(tag_id)
      on delete cascade,

   add constraint fk_tags_tags_child
      foreign key (child_id)
      references tags(tag_id)
      on delete cascade,

   add constraint fk_tags_tags_users
      foreign key (user_id)
      references users(user_id)
      on delete cascade;
commit;

-- habits_tags
begin;
   alter table habits_tags
   add constraint fk_habits_tags_habits
      foreign key (habit_id)
      references habits(habit_id)
      on delete cascade,

   add constraint fk_habits_tags_tags
      foreign key (tag_id)
      references tags(tag_id)
      on delete cascade,

   add constraint fk_habits_tags_users
      foreign key (user_id)
      references users(user_id)
      on delete cascade;
commit;