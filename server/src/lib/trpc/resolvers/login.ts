import { login as _login } from "@/lib/auth/log-in";
import { publicProcedure } from "@/lib/trpc/procedures/public.procedure";
import { newUserSchema } from "@shared/types/data/user.types";

export const login = publicProcedure
	.input(newUserSchema)
	.mutation(async ({ input, ctx: { req, res } }) => {
		return await _login(input, req, res);
	});
