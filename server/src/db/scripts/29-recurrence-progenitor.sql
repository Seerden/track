alter table activities
   add column recurrence_progenitor boolean default false;

alter table activities 
   rename column recurrence_progenitor to will_recur;