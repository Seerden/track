import useLoginMutation from "./use-login-mutation";
import useLogoutMutation from "./use-logout-mutation";
import useMeQuery from "./use-me-query";

export default function useAuthentication() {
	const { mutate: login } = useLoginMutation();
	const { mutate: logout } = useLogoutMutation();

	const { data } = useMeQuery();
	const currentUser = data?.user;

	const isLoggedIn = !!currentUser;

	return {
		data,
		login,
		logout,
		isLoggedIn,
		currentUser,
	};
}
