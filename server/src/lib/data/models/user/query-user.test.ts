import type { NewUser } from "@shared/lib/schemas/user";
import { compare } from "bcryptjs";
import {
	createTransaction,
	getConnectionFromAsyncStore,
} from "@/lib/query-function";
import { createUser } from "./insert-user";
import { queryUserByName } from "./query-user";

describe("queryUserByName", () => {
	it("should return a just-inserted user", async () => {
		await createTransaction(async () => {
			const newUser: NewUser = {
				username: "Billy",
				password: "this should really be a hash",
				email: "test@me.com",
			};

			await createUser({ newUser });

			const foundUser = await queryUserByName({
				username: newUser.username,
			});

			if (!foundUser) throw new Error("User not found");
			expect(foundUser).toBeDefined();
			expect(foundUser.username).toBeDefined();
			expect(foundUser.username).toEqual(newUser.username);
			expect(await compare(newUser.password, foundUser.password_hash)).toEqual(
				true
			);

			const sql = getConnectionFromAsyncStore();
			await sql`rollback`;
		});
	});

	it("should not return a user that doesn't exist", async () => {
		await createTransaction(async () => {
			const shouldBeUndefined = await queryUserByName({
				username: `${Math.random()}`,
			});

			expect(shouldBeUndefined).toBeUndefined();

			const sql = getConnectionFromAsyncStore();
			await sql`rollback`;
		});
	});
});
