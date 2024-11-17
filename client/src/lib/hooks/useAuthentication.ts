import useLoginMutation from "../query/user/useLoginMutation";
import useLogoutMutation from "../query/user/useLogoutMutation";
import useMeQuery from "../query/user/useMeQuery";

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
