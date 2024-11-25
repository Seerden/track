import { sqlConnection } from "@/db/init";
import { type User } from "@t/data/user.types";
import type { Maybe } from "@t/data/utility.types";
import { type ID } from "@t/data/utility.types";
import type { QueryFunction } from "types/sql.types";

export const queryUserByName: QueryFunction<
	{ username: string },
	Promise<Maybe<User>>
> = async ({ sql = sqlConnection, username }) => {
	const [user] = await sql<[User?]>`
      select * from users where username = ${username}
   `;
	return user;
};

export const queryUserbyId: QueryFunction<{ user_id: ID }, Promise<User>> = async ({
	sql = sqlConnection,
	user_id,
}) => {
	const [user] = await sql<[User]>`
      select * from users where user_id = ${user_id}
   `;
	return user;
};
