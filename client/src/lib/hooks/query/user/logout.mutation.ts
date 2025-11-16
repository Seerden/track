import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { defaultQueryConfig } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";
import { localUser } from "@/lib/user-storage";

export function useLogoutMutation() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation(
		trpc.auth.logout.mutationOptions({
			onSuccess: () => {
				// unset local user on successful logout
				localUser.destroy();

				queryClient.setDefaultOptions({
					...defaultQueryConfig,
					queries: {
						...defaultQueryConfig.queries,
						enabled: false,
					},
				});

				// TODO: should we clear _everything_? Or should it be enough to clear
				// `me` (above)? Need to make it so useAuthentication redirects on
				// logout, too, instead of doing it here, I think.
				queryClient.removeQueries();

				navigate({ to: "/login" });
			},
		})
	);
}
