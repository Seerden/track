alter table tags_tags
    add column created_at timestamp not null default now();