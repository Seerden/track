-- this table mirrors the shape of the email object returned by the Resend API
create table if not exists emails (
   id text not null primary key,
   "object" text not null,
   reply_to text[],
   "from" text not null,
   last_event text not null,
   "to" text[] not null,
   cc text[],
   bcc text[],
   "subject" text not null,
   "text" text,
   html text,
   scheduled_at text ,
   created_at text not null
);