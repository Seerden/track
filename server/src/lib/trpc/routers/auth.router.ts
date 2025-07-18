import { login } from "@/lib/trpc/resolvers/login";
import { logout } from "@/lib/trpc/resolvers/logout";
import { me } from "@/lib/trpc/resolvers/me";
import { register } from "@/lib/trpc/resolvers/register";
import { t } from "@/lib/trpc/trpc-context";

export const authRouter = t.router({
	me,
	login,
	logout,
	register,
});
