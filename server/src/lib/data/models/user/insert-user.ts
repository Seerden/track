import { sqlConnection } from "@/db/init";
import type { NewUser, User, UserInput } from "@t/data/user.types";
import { hash } from "bcryptjs";
import type { WithSQL } from "types/sql.types";
import { getUserByName } from "./query-user";

async function generatePasswordHash(password: string) {
	return hash(password, 11);
}

/** If username is not taken yet, hash the provided password and insert the user
 * into the database. */
export async function createUser({
	sql = sqlConnection,
	newUser,
}: WithSQL<{ newUser: NewUser }>) {
	if (await getUserByName({ sql, username: newUser.username })) return;

	const passwordHash = await generatePasswordHash(newUser.password);
	const userInput: UserInput = {
		username: newUser.username,
		password_hash: passwordHash,
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
