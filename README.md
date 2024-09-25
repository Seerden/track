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
- `note:<message>` for example when the commit refers to a TODO message being
  left inside the code.