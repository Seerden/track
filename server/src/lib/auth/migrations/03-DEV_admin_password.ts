import { config } from "dotenv";
import { auth } from "@/auth";

config();

// TODO: pass these from CLI args
const { email, name, password, role } = process.env as any;

async function resetAdminUserPassword() {
	const user = await auth.api.createUser({
		body: {
			email,
			name,
			password,
			role,
		},
	});
	console.log({ user });
}

try {
	await resetAdminUserPassword();
} catch (error) {
	console.error(error);
} finally {
	process.exit(1);
}
