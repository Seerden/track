-- logbook > log_template > log > ...

create table if not exists logbooks (
   logbook_id bigint generated always as identity primary key,
   name varchar(64) not null,
   description text,

   created_at timestamp default now(),
   user_id serial references users on delete cascade
);

create table if not exists log_templates (
   log_template_id bigint generated always as identity primary key,
   logbook_id bigint not null references logbooks on delete cascade,
   name varchar(64),

   created_at timestamp default now()
);

create table if not exists logs (
   log_id bigint generated always as identity primary key,
   logbook_id bigint not null references logbooks on delete cascade,
   log_template_id bigint references log_templates on delete set null,

   name varchar(64),
   start_time timestamptz,
   end_time timestamptz,

   created_at timestamp default now()
);

create table if not exists item_templates (
   item_template_id bigint generated always as identity primary key,
   logbook_id bigint not null references logbooks on delete cascade,
   name varchar(64) not null,
   description text,
   standalone boolean default false,

   created_at timestamp default now()
);

create table if not exists items (
   item_id bigint generated always as identity primary key,
   logbook_id bigint not null references logbooks on delete cascade,
   item_template_id bigint not null references item_templates on delete cascade,
   name varchar(64) not null,

   created_at timestamp default now()
);

create table if not exists item_rows (
   item_row_id bigint generated always as identity primary key,
   item_id bigint not null references items on delete cascade,
   log_id bigint not null references logs on delete cascade,
   position int not null,

   created_at timestamp default now()
);

create table if not exists field_templates (
   field_template_id bigint generated always as identity primary key,
   logbook_id bigint not null references logbooks on delete cascade,
   item_template_id bigint not null references item_templates on delete cascade,
   name varchar(64) not null,
   value_type varchar(32) not null, -- text, number, date, time, datetime, boolean, etc.. whatever we can figure out to make a good UI for
   unit varchar(32),
   description text,
   position int not null,
   required boolean default true,

   created_at timestamp default now()
);

create table if not exists field_values (
   field_value_id bigint generated always as identity primary key,
   field_template_id bigint not null references field_templates on delete cascade,
   item_row_id bigint not null references item_rows on delete cascade,
   log_id bigint not null references logs on delete cascade,
   value varchar(256), -- this can be nullable if the template specifies required=false

   created_at timestamp default now()
);