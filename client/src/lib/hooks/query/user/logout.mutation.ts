import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { authClient } from "@/lib/auth-client";
import { popoverAtom } from "@/lib/hooks/usePopover";
import { defaultQueryConfig } from "@/lib/query-client";

export function useLogoutMutation() {
	const queryClient = useQueryClient();
	const setPopoverState = useSetAtom(popoverAtom);
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async () => {
			return await authClient.signOut();
		},
		onSuccess: () => {
			queryClient.setDefaultOptions({
				...defaultQueryConfig,
				queries: {
					...defaultQueryConfig.queries,
					enabled: false,
				},
			});

			// TODO: should we clear _everything_? Or should it be enough to clear
			// `me`? Need to make it so useAuthentication redirects on
			// logout, too, instead of doing it here, I think.
			queryClient.removeQueries();

			// destroy popover state
			setPopoverState(new Map());

			navigate({ to: "/login" });
		},
	});
}
