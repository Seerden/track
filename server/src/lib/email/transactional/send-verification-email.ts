import { sqlConnection } from "@/db/init";
import { emailFrom, sendEmail } from "../send-email";

export async function sendTestVerificationEmail() {
	return await sendEmail({
		sql: sqlConnection,
		payload: {
			to: ["christiaanseerden@live.nl"],
			from: emailFrom,
			subject: "Verify your Track account",
			html: `
            <h1>Verify your track account</h1>
            <p>
               <span>Click the following link to verify your account. This link is only valid for the next 24 hours.</span>

               <a href="https://localhost:3000/auth/verify?token=${Math.random()}">Verify your account</a>

               <spanIf you did not request this email, please ignore it.

            </p>

         `,
		},
	});
}

try {
	await sendTestVerificationEmail();
	console.log("Email sent successfully");
} catch (error) {
	console.error(error);
}
