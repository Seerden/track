import useMutateLogin from "@/lib/hooks/query/user/useMutateLogin";
import useMutateLogout from "@/lib/hooks/query/user/useMutateLogout";
import useQueryMe from "@/lib/hooks/query/user/useQueryMe";

export default function useAuthentication() {
	const { mutate: login } = useMutateLogin();
	const { mutate: logout } = useMutateLogout();

	const { data } = useQueryMe();
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
