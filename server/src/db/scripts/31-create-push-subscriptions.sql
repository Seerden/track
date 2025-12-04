create table if not exists push_subscriptions (
   push_subscription_id serial primary key,  
   push_subscription jsonb not null,
   user_id serial not null references users,
   created_at timestamp default now()
   -- TODO: the combination of user_id and push_subscription.endpoint is unique, but
   -- I'm not sure how I want to enforce that yet
);

