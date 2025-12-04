import { captureException } from "@sentry/node";
import type { CreateEmailOptions, CreateEmailRequestOptions } from "resend";
import { query } from "@/lib/query-function";
import { insertEmail } from "../data/models/email/insert-email";
import { emailSchema } from "./email.schema";
import { generateEntityId } from "./generate-id";
import { resendClient } from "./resend";

export const emailFrom = "Chris from Track <auth@track-mail.seerden.dev>";

export const sendEmail = query(
	async (
		sql,
		{
			payload,
			options = {},
		}: { payload: CreateEmailOptions; options?: CreateEmailRequestOptions }
	) => {
		const { data, error } = await resendClient.emails.send(
			{
				...payload,
				headers: {
					...payload.headers,
					...generateEntityId(), // got this from an example in the docs, this prevents threads in gmail
				},
			},
			options
		);
		if (error) {
			captureException({
				message: "Failed to send email",
				level: "error",
				extra: {
					error,
					email: {
						payload,
						options,
					},
				},
			});
			throw error;
		}

		// store the email in the database, since the free tier of Resend only
		// stores emails for a very short period of time.
		if (data?.id) {
			console.log({ data, a: 1 });
			const email = await getEmailById(data.id);
			return await insertEmail({ sql, email });
		}

		throw new Error("Resend did not return an email ID.");
	}
);

/** Gets a single email from resend.
 * @note because of the limitationg of the free tier of Resend, we need to store
 * emails in our own database so we can refer to them later. We have a limited
 * number of emails we can send, and Resend stores them for a very short period,
 * so don't test this function directly by sending a mock email and retrieving
 * it, for example.
 */
export async function getEmailById(emailId: string) {
	const { data, error } = await resendClient.emails.get(emailId);

	if (error) {
		throw new Error(error.message);
	}

	return emailSchema.parse(data);

	// should throw here. If we're here, the shape of the response from Resend
	// probably changed.
}
