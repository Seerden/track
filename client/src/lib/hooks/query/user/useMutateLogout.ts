import userService from "@/lib/fetch/user-service";
import useRouteProps from "@/lib/hooks/useRouteProps";
import { queryClient } from "@/lib/query-client";
import { mk, qk } from "@/lib/query-keys";
import { localUser } from "@/lib/user-storage";
import { useMutation } from "@tanstack/react-query";

export default function useMutateLogout() {
	const { navigate } = useRouteProps();

	return useMutation({
		mutationKey: mk.user.logout, // TODO: should we distinguish between login and logout?
		async mutationFn() {
			return userService.logout();
		},
		onSuccess: () => {
			// unset local user on successful logout
			localUser.destroy();
			queryClient.removeQueries({ queryKey: qk.user.me });

			// TODO: should we clear _everything_? Or should it be enough to clear
			// `me` (above)? Need to make it so useAuthentication redirects on
			// logout, too, instead of doing it here, I think.
			queryClient.clear();
			navigate("/login");
		}
	});
}
