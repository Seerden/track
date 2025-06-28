import { useLoginMutation } from "@/lib/hooks/query/user/login.mutation";
import { useLogoutMutation } from "@/lib/hooks/query/user/logout.mutation";
import { trpc } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";

export default function useAuthentication() {
	const { mutate: login } = useLoginMutation();
	const { mutate: logout } = useLogoutMutation();

	const { data } = useQuery(trpc.auth.me.queryOptions());
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
