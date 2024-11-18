import { type User } from "@t/data/user.types";
import { type ID } from "@t/data/utility.types";
import { type WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";

export async function userExists({
	sql = sqlConnection,
	username,
}: WithSQL<{ username: string }>) {
	const [user] = await sql<[User]>`select * from users where username = ${username}`;
	return user;
}

export async function getUserByName({
	sql = sqlConnection,
	username,
}: WithSQL<{ username: string }>) {
	const [user] = await sql<[User?]>`select * from users where username = ${username}`;
	return user;
}

export async function getUserById({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID }>) {
	const [user] = await sql<[User]>`select * from users where user_id = ${user_id}`;
	return user;
}
