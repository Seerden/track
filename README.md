## Where am I?
This is (going to be) a timekeeping/journaling application. Currently it's an
incoherent bunch of standalone, partially functional components with throwaway
styling. Stay tuned for something that resembles an actual product. ⏳

## running this project
- `npm run dev` on the client to start the vite dev server.
- `npm run dev` in the top-level to run the containers (with the way things are
  set up currently, client has to be run separately using the above command)
- `npm run db` or `npm run test-db` to get into the database or test database

## commits:
- `types:<message>` when doing something with typing,
- `dev:<message>` when something is extremely temporary but necessary for
  work in progress,
- `wip:<message>` when a commit doesn't fully implement the thing that the
  message says is being worked on,
- `todo:<message>` for example when the commit refers to a TODO message being
  left inside the code.

## .env structure
These are the .env variables that need to be in `server/` and `docker/`
```
SESSION_SECRET= 
PG_USER=
PG_PASS=
PG_DB=
DB_HOST=
PG_PORT=
PG_TEST_DB=
DB_TEST_HOST=
PG_TEST_PORT=
```