import type { sqlConnection } from "../src/db/init";

export type SQL = typeof sqlConnection;

export type WithSQL<T> = T & { sql?: SQL };

export type DatabaseInteractionFunction<TInput, TOutput> = (
	args: WithSQL<TInput>,
) => TOutput;
