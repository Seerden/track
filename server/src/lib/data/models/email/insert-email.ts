import { captureException } from "@sentry/node";
import { TABLES } from "types/tables";
import { type Email, emailSchema } from "@/lib/email/email.schema";
import { query } from "@/lib/query-function";

/** Takes an `email`, which we got elsewhere from the resend API, and inserts it
 * in the database so we can refer to it later. */
export const insertEmail = query(async (sql, { email }: { email: Email }) => {
	const parsedEmail = emailSchema.safeParse(email);

	if (!parsedEmail.success) {
		captureException(parsedEmail.error);
		throw parsedEmail.error;
	}

	const [insertedEmail] = await sql<[Email]>`
         insert into ${sql(TABLES.EMAILS)} ${sql(parsedEmail.data)} 
         returning *;
      `;

	return insertedEmail;
});
