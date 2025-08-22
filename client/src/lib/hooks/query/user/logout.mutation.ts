import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";
import { localUser } from "@/lib/user-storage";

export function useLogoutMutation() {
	const navigate = useNavigate();
	return useMutation(
		trpc.auth.logout.mutationOptions({
			onSuccess: () => {
				// unset local user on successful logout
				localUser.destroy();
				queryClient.removeQueries({ queryKey: trpc.auth.me.queryKey() });

				// TODO: should we clear _everything_? Or should it be enough to clear
				// `me` (above)? Need to make it so useAuthentication redirects on
				// logout, too, instead of doing it here, I think.
				queryClient.clear();
				navigate({ to: "/login" });
			},
		})
	);
}
