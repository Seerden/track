import useLoginMutation from "./query/use-login-mutation";
import useLogoutMutation from "./query/use-logout-mutation";
import useMeQuery from "./query/use-me-query";

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
		currentUser
	};
}
