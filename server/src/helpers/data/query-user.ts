import { User } from "../../../types/data/user.types";
import { sqlConnection } from "../../db/init";

export async function userExists({ sql = sqlConnection, username }) {
	const [user] = await sql<[User]>`select * from users where username = ${username}`;
	return user;
}

export async function getUserByName({ sql = sqlConnection, username }) {
	const [user] = await sql<[User]>`select * from users where username = ${username}`;
	return user;
}

export async function getUserById({ sql = sqlConnection, user_id }) {
	const [user] = await sql<[User]>`select * from users where user_id = ${user_id}`;
	return user;
}
