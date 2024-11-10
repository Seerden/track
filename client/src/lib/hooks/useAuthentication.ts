import useLoginMutation from "../query/useLoginMutation";
import useLogoutMutation from "../query/useLogoutMutation";
import useMeQuery from "../query/useMeQuery";

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
