import useLoginMutation from "@lib/hooks/query/user/useLoginMutation";
import useLogoutMutation from "@lib/hooks/query/user/useLogoutMutation";
import useMeQuery from "@lib/hooks/query/user/useMeQuery";

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
