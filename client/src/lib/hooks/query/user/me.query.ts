import { trpc } from "@/lib/trpc";
import { localUser } from "@/lib/user-storage";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useMeQuery() {
	const { data } = useQuery(trpc.auth.me.queryOptions());

	useEffect(() => {
		if (data?.user) {
			localUser.set(data.user);
		} else {
			localUser.destroy();
		}
	}, [data]);
}
