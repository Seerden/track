-- this is a slightly modified version of the CLI `auth:generate` output.
create table
   if not exists auth.user (
      "id" integer not null primary key,
      "name" text not null,
      "email" text not null unique,
      "emailVerified" integer not null,
      "image" text,
      "createdAt" date not null,
      "updatedAt" date not null,
      "role" text,
      "banned" integer,
      "banReason" text,
      "banExpires" date,
      "username" text unique,
      "displayUsername" text
   );

create table
   if not exists auth.session (
      "id" integer not null primary key,
      "expiresAt" date not null,
      "token" text not null unique,
      "createdAt" date not null,
      "updatedAt" date not null,
      "ipAddress" text,
      "userAgent" text,
      "userId" integer not null references auth.user ("id") on delete cascade,
      "impersonatedBy" text
   );

create table
   if not exists auth.account (
      "id" integer not null primary key,
      "accountId" text not null,
      "providerId" text not null,
      "userId" integer not null references auth.user ("id") on delete cascade,
      "accessToken" text,
      "refreshToken" text,
      "idToken" text,
      "accessTokenExpiresAt" date,
      "refreshTokenExpiresAt" date,
      "scope" text,
      "password" text,
      "createdAt" date not null,
      "updatedAt" date not null
   );

create table
   if not exists auth.verification (
      "id" integer not null primary key,
      "identifier" text not null,
      "value" text not null,
      "expiresAt" date not null,
      "createdAt" date not null,
      "updatedAt" date not null
   );

create index if not exists "session_userId_idx" on auth.session ("userId");

create index if not exists "account_userId_idx" on auth.account ("userId");

create index if not exists "verification_identifier_idx" on auth.verification ("identifier");