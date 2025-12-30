alter table activities_tags
drop constraint fk_activities_tags_tags,
add constraint fk_activities_tags_tags foreign key (tag_id) references tags (tag_id) on delete cascade;