import type { NewUser } from "@shared/lib/schemas/user";
import type { OmitStrict } from "@shared/types/data/utility.types";
import { TRPCError } from "@trpc/server";
import { compare } from "bcryptjs";
import type { Request, Response } from "express";
import { queryUserByName } from "@/lib/data/models/user/query-user";
import { destroySession } from "./destroy-session";

// TODO (TRK-291) log in with either username or email, or other methods if we
// end up implementing betterAuth.
type LoginInput = OmitStrict<NewUser, "email">;

/** Request handler. If login info is valid, (re-)set the session. */
export async function login(user: LoginInput, req: Request, res: Response) {
	const foundUser = await queryUserByName({ username: user.username });

	if (!foundUser) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "No user found for given credentials.",
		});
	}

	const passwordMatches = await compare(user.password, foundUser.password_hash);

	if (!passwordMatches) {
		await destroySession({ req, res });
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "No user found for given credentials.",
		});
	}

	req.session.user = {
		user_id: foundUser.user_id,
		username: foundUser.username,
		email: foundUser.email,
	}; // could also regenerate()

	console.info({
		message: "Login successful",
		user: foundUser,
	});

	return { user: foundUser };
}
