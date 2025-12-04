import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { popoverAtom } from "@/lib/hooks/usePopover";
import { defaultQueryConfig } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";
import { localUser } from "@/lib/user-storage";

export function useLogoutMutation() {
	const setPopoverState = useSetAtom(popoverAtom);
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

				// destroy popover state
				setPopoverState(new Map());

				navigate({ to: "/login" });
			},
		})
	);
}
