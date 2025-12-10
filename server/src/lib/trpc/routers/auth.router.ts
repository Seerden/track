import { me } from "@/lib/trpc/resolvers/me";
import { t } from "@/lib/trpc/trpc-context";

export const authRouter = t.router({
	me,
});
