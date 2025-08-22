import type { NewUser } from "@shared/lib/schemas/user";
import { compare } from "bcryptjs";
import { sqlConnection } from "@/db/init";
import { createUser } from "./insert-user";
import { queryUserByName } from "./query-user";

describe("queryUserByName", () => {
	it("should return a just-inserted user", async () => {
		sqlConnection.begin(async (q) => {
			const newUser: NewUser = {
				username: "Billy",
				password: "this should really be a hash",
			};

			await createUser({ sql: q, newUser });

			const foundUser = await queryUserByName({
				sql: q,
				username: newUser.username,
			});

			if (!foundUser) throw new Error("User not found");
			expect(foundUser).toBeDefined();
			expect(foundUser.username).toBeDefined();
			expect(foundUser.username).toEqual(newUser.username);
			expect(await compare(newUser.password, foundUser.password_hash)).toEqual(
				true
			);

			q`rollback`;
		});
	});

	it("should not return a user that doesn't exist", async () => {
		await sqlConnection.begin(async (sql) => {
			const shouldBeUndefined = await queryUserByName({
				sql,
				username: `${Math.random()}`,
			});

			expect(shouldBeUndefined).toBeUndefined();

			sql`rollback`;
		});
	});
});
