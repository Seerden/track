import { login as _login } from "@/lib/auth/log-in";
import { publicProcedure } from "@/lib/trpc/procedures/public.procedure";
import { newUserSchema } from "@shared/lib/schemas/user";

export const login = publicProcedure
	.input(newUserSchema)
	.mutation(async ({ input, ctx: { req, res } }) => {
		return await _login(input, req, res);
	});
