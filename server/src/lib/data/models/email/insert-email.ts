import type { QueryFunction } from "types/sql.types";
import { TABLES } from "types/tables";
import { sqlConnection } from "@/db/init";
import { type Email, emailSchema } from "@/lib/email/email.schema";

/** Takes an `email`, which we got elsewhere from the resend API, and inserts it
 * in the database so we can refer to it later. */
export const insertEmail: QueryFunction<
	{
		email: Email;
	},
	Promise<Email>
> = async ({ sql = sqlConnection, email }) => {
	console.log({ email });

	emailSchema.parse(email);

	const [insertedEmail] = await sql<[Email]>`
         insert into ${sql(TABLES.EMAILS)} ${sql(email)} 
         returning *;
      `;

	return insertedEmail;
};
