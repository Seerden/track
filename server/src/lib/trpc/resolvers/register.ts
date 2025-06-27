import { login } from "@/lib/auth/log-in";
import { createUser } from "@/lib/data/models/user/insert-user";
import { publicProcedure } from "@/lib/trpc/procedures/public.procedure";
import { newUserSchema } from "@shared/types/data/user.types";
import { TRPCError } from "@trpc/server";

export const register = publicProcedure
	.input(newUserSchema)
	.mutation(async ({ input: newUser, ctx: { req, res } }) => {
		const registeredUser = await createUser({ newUser });

		if (!registeredUser) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "Registration failed.",
			});
		} else {
			return await login(newUser, req, res);
		}
	});
