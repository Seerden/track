import { destroySession } from "@/lib/auth/destroy-session";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const logout = authenticatedProcedure.mutation(async ({ ctx: { req, res } }) => {
	return await destroySession({ req, res });
});
