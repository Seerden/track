import { sqlConnection } from "@/db/init";
import type { User } from "@shared/lib/schemas/user";
import type { Maybe } from "@shared/types/data/utility.types";
import type { ID } from "@shared/types/data/utility.types";
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

export const queryUserbyId: QueryFunction<
	{ user_id: ID },
	Promise<User>
> = async ({ sql = sqlConnection, user_id }) => {
	const [user] = await sql<[User]>`
      select * from users where user_id = ${user_id}
   `;
	return user;
};
