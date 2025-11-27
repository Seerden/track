begin;

alter table user_settings 
   add column default_task_completion_filter varchar(32),
   add column default_habit_completion_filter varchar(32);

commit;