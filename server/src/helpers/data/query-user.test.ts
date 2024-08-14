import { compare } from "bcryptjs";
import { NewUser } from "../../../types/data/user.types";
import { sqlConnection } from "../../db/init";
import { insertUser } from "./insert-user";
import { getUserByName, userExists } from "./query-user";

describe("getUser", () => {
	it("returns a just-inserted user", async () => {
		sqlConnection.begin(async (q) => {
			const newUser: NewUser = {
				username: "Billy",
				password: "this should really be a hash",
			};

			await insertUser({ sql: q, newUser });

			const foundUser = await getUserByName({ sql: q, username: newUser.username });

			expect(foundUser?.username).toBeDefined();
			expect(foundUser?.username).toEqual(newUser.username);
			expect(await compare(newUser.password, foundUser?.password_hash)).toEqual(true);

			q`rollback`;
		});
	});

	it("does not return a user that doesn't exist", async () => {
		await sqlConnection.begin(async (sql) => {
			const shouldBeUndefined = await getUserByName({
				sql,
				username: `${Math.random()}`,
			});

			expect(shouldBeUndefined).toBeUndefined();

			sql`rollback`;
		});
	});
});

describe("userExists", () => {
	it("returns true for existing user, false for nonexistent user", async () => {
		const user: NewUser = {
			username: `${Math.random()}`,
			password: "1",
		};
		sqlConnection.begin(async (sql) => {
			await insertUser({ sql, newUser: user });

			expect(await userExists({ sql, username: user.username })).toBeTruthy();
			expect(await userExists({ sql, username: `${Math.random()}` })).toBeFalsy();

			sql`rollback`;
		});
	});
});
