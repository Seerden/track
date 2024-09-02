import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl, postConfig } from "./fetch/fetch-constants";
import { localUser } from "./user-storage";

async function postLogout() {
	return (
		await fetch(`${baseUrl}/auth/logout`, {
			...postConfig,
		})
	).json();
}

export default function useLogoutMutation() {
	const client = useQueryClient();

	return useMutation({
		mutationKey: ["logout"],
		mutationFn: postLogout,
		// unset local user on successful logout
		onSuccess: () => {
			localUser.destroy();
			client.removeQueries({ queryKey: ["me"] });
		},
	});
}
