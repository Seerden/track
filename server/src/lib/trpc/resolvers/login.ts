import { newUserSchema } from "@shared/lib/schemas/user";
import { login as _login } from "@/lib/auth/log-in";
import { publicProcedure } from "@/lib/trpc/procedures/public.procedure";

export const login = publicProcedure
	// TODO (TRK-291) log in with either username or email, or other methods if we
	// end up implementing betterAuth.
	.input(newUserSchema.omit({ email: true }))
	.mutation(async ({ input, ctx: { req, res } }) => {
		return await _login(input, req, res);
	});
