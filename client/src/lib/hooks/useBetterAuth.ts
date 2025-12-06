import { queryOptions } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

/** @deprecated (TRK-317) I currently don't have a use case for this yet. Maybe
 * authClient.useSession would be more useful, anyway. */
export const useSessionOpts = queryOptions({
	queryKey: ["auth", "session"],
	queryFn: async () => authClient.getSession(),
});
