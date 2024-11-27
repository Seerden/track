import api from "@/lib/fetch/api";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import { localUser } from "@/lib/user-storage";
import type { UserData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";

export async function getMe() {
	const data = await api.get<UserData>({ url: "/auth/me" });

	if (data.user) {
		localUser.set(data.user);
	} else {
		localUser.destroy();
	}

	return data;
}

export default function useMeQuery() {
	return useQuery<UserData>({
		queryKey: qk.user.me,
		queryFn: getMe,
		...defaultQueryConfig
	});
}
