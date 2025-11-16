import type { NewUser, User, UserInput } from "@shared/lib/schemas/user";
import { hash } from "bcryptjs";
import { query } from "@/lib/query-function";
import { queryUserByName } from "./query-user";

async function generatePasswordHash(password: string) {
	return hash(password, 11);
}

/** If username is not taken yet, hash the provided password and insert the user
 * into the database. */
export const createUser = query(
	async (sql, { newUser }: { newUser: NewUser }) => {
		if (await queryUserByName({ username: newUser.username })) return;

		const passwordHash = await generatePasswordHash(newUser.password);
		const userInput: UserInput = {
			username: newUser.username,
			password_hash: passwordHash,
			email: newUser.email,
		};

		// TODO: check if email is unique
		if (newUser.email) userInput.email = newUser.email;

		const [insertedUser] = await sql<[User?]>`
         insert into users 
         ${sql(userInput)}
         returning *
      `;

		return insertedUser;
	}
);
