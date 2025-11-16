import type { User } from "@shared/lib/schemas/user";
import type { ID } from "@shared/types/data/utility.types";
import { query } from "@/lib/query-function";

export const queryUserByName = query(
	async (sql, { username }: { username: string }) => {
		const [user] = await sql<[User?]>`
         select * from users where username = ${username}
      `;

		return user;
	}
);

export const queryUserbyId = query(
	async (sql, { user_id }: { user_id: ID }) => {
		const [user] = await sql<[User]>`
      select * from users where user_id = ${user_id}
   `;
		return user;
	}
);
