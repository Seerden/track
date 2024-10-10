import { useQuery } from "@tanstack/react-query";
import { Data } from "@type/query.types";
import { User } from "@type/server/user.types";
import { Maybe } from "@type/server/utility.types";
import { baseUrl } from "../fetch/fetch-constants";
import { defaultQueryConfig } from "../query-client";
import { localUser } from "../user-storage";

export async function getMe() {
	const response = await fetch(`${baseUrl}/auth/me`, {
		credentials: "include",
		method: "GET",
	});
	const data = await response.json();

	// this would have been in onSuccess in the past
	if (data.user) {
		localUser.set(data.user);
	} else {
		// this would have been in onError in the past
		localUser.destroy();
	}

	return data;
}

type UserData = Data<"user", Maybe<User>>;

export default function useMeQuery() {
	return useQuery<UserData>({
		queryKey: ["me"],
		queryFn: getMe,
		...defaultQueryConfig,
	});
}
