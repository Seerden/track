import type { User } from "@shared/lib/schemas/user";
import { config } from "dotenv";
import { TABLES } from "types/tables";
import { auth } from "@/auth";
import { createTransaction, query } from "@/lib/query-function";

config();

export const migrateUsers = query(async () => {
	return await createTransaction(async (sql) => {
		const users = await sql<User[]>`select * from ${sql(TABLES.users)}`;

		for (const user of users) {
			const newUser = await auth.api.createUser({
				body: {
					email: user.email,
					name: user.username,
					password: crypto.randomUUID(),
					role: "admin",
				},
			});
			console.log({ message: "created better auth user", newUser });
		}

		for (const user of users) {
			await sql`
            update ${sql(TABLES.BETTER_AUTH.USERS)}
            set "emailVerified" = 1,
            set "username" = ${user.username},
            set "displayUsername" = ${user.username}
            where email = ${user.email}
         `;
			console.log({ message: "verified user", username: user.username });
		}
	});
});

try {
	await migrateUsers();
} catch (error) {
	console.error(error);
} finally {
	process.exit(1);
}
