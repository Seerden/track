import postgres from "postgres";

const {
	PG_USER,
	PG_PASS,
	PG_DB,
	DB_HOST,
	PG_PORT,
	PG_TEST_PORT,
	PG_TEST_DB,
	DB_TEST_HOST,
	IS_TEST_ENVIRONMENT,
} = process.env;

const options = {
	host: DB_HOST,
	user: PG_USER,
	pass: PG_PASS,
	database: PG_DB,
	port: +(PG_PORT ?? 5432),
};

const testOptions = {
	user: PG_USER,
	pass: PG_PASS,
	database: PG_TEST_DB,
	port: +(PG_TEST_PORT ?? 5434),
	host: DB_TEST_HOST,
};

export const sqlConnection = postgres(IS_TEST_ENVIRONMENT ? testOptions : options);
