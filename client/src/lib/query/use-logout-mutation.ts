import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRequestConfig } from "../fetch/create-request-config";
import { baseUrl } from "../fetch/fetch-constants";
import { localUser } from "../user-storage";

async function postLogout() {
	return (await fetch(`${baseUrl}/auth/logout`, createRequestConfig.post())).json();
}

export default function useLogoutMutation() {
	const client = useQueryClient();

	return useMutation({
		mutationKey: ["logout"],
		async mutationFn() {
			return postLogout();
		},
		onSuccess: () => {
			// unset local user on successful logout
			localUser.destroy();
			client.removeQueries({ queryKey: ["me"] });
		}
	});
}
