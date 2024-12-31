-- users
-- rename user_id to user_id_old, then add user_id bigint generated always as
-- identity primary key using user_id_old::bigint
alter table users drop constraint users_pkey cascade;
alter table users drop column user_id;
alter table users add column user_id bigint generated always as identity primary key;

-- tags
alter table tags drop constraint tags_pkey cascade;
alter table tags rename column tag_id to tag_id_old;
alter table tags add column tag_id bigint generated always as identity primary key;
alter table tags drop column tag_id_old;

alter table tags alter column user_id type bigint using user_id::bigint;

-- activities
alter table activities drop constraint activities_pkey cascade;
alter table activities rename column activity_id to activity_id_old;
alter table activities add column activity_id bigint generated always as identity primary key;
alter table activities drop column activity_id_old;

alter table activities alter column user_id type bigint using user_id::bigint;

-- notes
alter table notes drop constraint notes_pkey cascade;
alter table notes rename column note_id to note_id_old;
alter table notes add column note_id bigint generated always as identity primary key;
alter table notes drop column note_id_old;

alter table notes alter column user_id type bigint using user_id::bigint;

-- habits
alter table habits drop constraint habits_pkey cascade;
alter table habits rename column habit_id to habit_id_old;
alter table habits add column habit_id bigint generated always as identity primary key;
alter table habits drop column habit_id_old;

alter table habits alter column user_id type bigint using user_id::bigint;

-- habit_entries
alter table habit_entries drop constraint habit_entries_pkey cascade;
alter table habit_entries rename column habit_entry_id to habit_entry_id_old;
alter table habit_entries add column habit_entry_id bigint generated always as identity primary key;
alter table habit_entries drop column habit_entry_id_old;

alter table habit_entries alter column user_id type bigint using user_id::bigint;

-- then, also need to replace all cases of "serial" in foreign keys etc. with
-- "bigint"

-- activities_tags
alter table activities_tags alter column user_id type bigint using user_id::bigint;
alter table activities_tags alter column activity_id type bigint using activity_id::bigint;
alter table activities_tags alter column tag_id type bigint using tag_id::bigint;

-- tags_tags
alter table tags_tags alter column user_id type bigint using user_id::bigint;
alter table tags_tags alter column parent_id type bigint using parent_id::bigint;
alter table tags_tags alter column child_id type bigint using child_id::bigint;

-- notes
alter table notes alter column activity_id type bigint using activity_id::bigint;

-- notes_tags
alter table notes_tags alter column note_id type bigint using note_id::bigint;
alter table notes_tags alter column tag_id type bigint using tag_id::bigint;

-- habit_entries
alter table habit_entries alter column habit_id type bigint using habit_id::bigint;

-- habits_tags
alter table habits_tags alter column user_id type bigint using user_id::bigint;
alter table habits_tags alter column habit_id type bigint using habit_id::bigint;
alter table habits_tags alter column tag_id type bigint using tag_id::bigint;

-- logbooks
alter table logbooks alter column user_id type bigint using user_id::bigint;