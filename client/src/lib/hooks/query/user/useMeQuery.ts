import { baseUrl } from "@/lib/fetch/fetch-constants";
import { defaultQueryConfig } from "@/lib/query-client";
import qk from "@/lib/query-keys";
import { localUser } from "@/lib/user-storage";
import { useQuery } from "@tanstack/react-query";
import type { Data } from "@type/query.types";
import type { User } from "@type/server/user.types";
import type { Maybe } from "@type/server/utility.types";

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
