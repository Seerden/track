import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLoginMutation } from "@/lib/hooks/query/user/login.mutation";
import { useLogoutMutation } from "@/lib/hooks/query/user/logout.mutation";
import { trpc } from "@/lib/trpc";

export default function useAuthentication() {
	const { mutate: login } = useLoginMutation();
	const { mutate: logout } = useLogoutMutation();

	const { data } = useQuery(trpc.auth.me.queryOptions());
	const currentUser = useMemo(() => {
		return data?.user;
	}, [data]);

	const isLoggedIn = useMemo(() => {
		return !!currentUser;
	}, [currentUser]);

	return {
		data,
		login,
		logout,
		isLoggedIn,
		currentUser,
	};
}
