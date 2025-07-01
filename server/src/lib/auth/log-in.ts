import { queryUserByName } from "@/lib/data/models/user/query-user";
import type { NewUser } from "@shared/lib/schemas/user";
import { TRPCError } from "@trpc/server";
import { compare } from "bcryptjs";
import type { Request, Response } from "express";
import { destroySession } from "./destroy-session";

/** Request handler. If login info is valid, (re-)set the session. */
// TODO: this was an express request handler, but will now be called from a trpc
// resolver, so we don't need the res.status stuff anymore.
export async function login(user: NewUser, req: Request, res: Response) {
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

	req.session.user = { user_id: foundUser.user_id, username: foundUser.username }; // could also regenerate()

	return { user: foundUser };
}
