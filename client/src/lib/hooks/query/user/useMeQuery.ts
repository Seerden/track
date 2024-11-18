import { baseUrl } from "@/lib/fetch/fetch-constants";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import { localUser } from "@/lib/user-storage";
import type { Data } from "@/types/query.types";
import type { User } from "@t/data/user.types";
import type { Maybe } from "@t/data/utility.types";
import { useQuery } from "@tanstack/react-query";

export async function getMe() {
	const response = await fetch(`${baseUrl}/auth/me`, {
		credentials: "include",
		method: "GET"
	});
	const data = await response.json();

	if (data.user) {
		localUser.set(data.user);
	} else {
		localUser.destroy();
	}

	return data;
}

type UserData = Data<"user", Maybe<User>>;

export default function useMeQuery() {
	return useQuery<UserData>({
		queryKey: qk.user.me,
		queryFn: getMe,
		...defaultQueryConfig
	});
}
