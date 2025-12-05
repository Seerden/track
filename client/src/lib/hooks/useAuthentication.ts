import { useQuery } from "@tanstack/react-query";
import { useLoginMutation } from "@/lib/hooks/query/user/login.mutation";
import { useLogoutMutation } from "@/lib/hooks/query/user/logout.mutation";
import { trpc } from "@/lib/trpc";

export default function useAuthentication() {
	const { mutate: login, isError: isLoginError } = useLoginMutation();
	const { mutate: logout, isError: isLogoutError } = useLogoutMutation();

	const { data } = useQuery(trpc.auth.me.queryOptions());

	const currentUser = data?.user;
	const isLoggedIn = !!currentUser;

	return {
		data,
		login,
		logout,
		isLoggedIn,
		currentUser,
		isLoginError,
		isLogoutError,
	};
}
