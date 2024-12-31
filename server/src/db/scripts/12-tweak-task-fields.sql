alter table activities
   drop column completion_timestamp,
   add column completion_start timestamp,
   add column completion_end timestamp;