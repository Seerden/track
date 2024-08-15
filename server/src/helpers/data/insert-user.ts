import { hash } from "bcryptjs";
import { NewUser, User, UserInput } from "../../../types/data/user.types";
import { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";
import { userExists } from "./query-user";

async function generatePasswordHash(password: string) {
	return hash(password, 11);
}

/** If username is not taken yet, hash the provided password and insert the user
 * into the database. */
export async function insertUser({
	sql = sqlConnection,
	newUser,
}: WithSQL<{ newUser: NewUser }>) {
	if (await userExists({ sql, username: newUser.username })) return;

	const passwordHash = await generatePasswordHash(newUser.password);
	const userInput: UserInput = {
		username: newUser.username,
		password_hash: passwordHash,
		// todo: add email here if it's not undefined
	};

	const [insertedUser] = await sql<[User?]>`
         insert into users 
         ${sql(userInput)}
         returning *
      `;

	return insertedUser;
}