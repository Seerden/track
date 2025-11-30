import { queryOptions } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export const useSessionOpts = queryOptions({
	queryKey: ["auth", "session"],
	queryFn: async () => authClient.getSession(),
});

export function useBetterAuth() {
	return authClient.useSession();
}
