import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { baseUrl } from "@/lib/fetch/fetch-constants";
import useRouteProps from "@/lib/hooks/useRouteProps";
import { queryClient } from "@/lib/query-client";
import { mk, qk } from "@/lib/query-keys";
import { localUser } from "@/lib/user-storage";
import { useMutation } from "@tanstack/react-query";

async function postLogout() {
	return (await fetch(`${baseUrl}/auth/logout`, createRequestConfig.post())).json();
}

export default function useLogoutMutation() {
	const { navigate } = useRouteProps();
	return useMutation({
		mutationKey: mk.user.logout, // TODO: should we distinguish between login and logout?
		async mutationFn() {
			return postLogout();
		},
		onSuccess: () => {
			// unset local user on successful logout
			localUser.destroy();
			queryClient.removeQueries({ queryKey: qk.user.me });

			// TODO: should we clear _everything_? Or should it be enough to clear
			// `me` (above)? Need to make it so useAuthentication redirects on
			// logout, too, instead of doing it here, I think.
			queryClient.clear();
			navigate("/");
		}
	});
}
