import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { baseUrl } from "@/lib/fetch/fetch-constants";
import qk from "@/lib/query-keys";
import { localUser } from "@/lib/user-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
			client.removeQueries({ queryKey: qk.user.me });
		}
	});
}
