alter table log_templates 
add column layout jsonb default '{}'::jsonb;