import { sqlConnection } from "../src/db/init";

export type SQL = typeof sqlConnection;

export type WithSQL<T> = T & { sql?: SQL };
