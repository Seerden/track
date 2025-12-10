import { createFileRoute } from "@tanstack/react-router";
import Account from "@/components/user/profile/Account";

export const Route = createFileRoute("/auth/account")({
	component: Account,
});
