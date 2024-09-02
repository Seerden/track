import { useQuery } from "@tanstack/react-query";
import { Data } from "../types/query.types";
import { User } from "../types/server/user.types";
import { Maybe } from "../types/server/utility.types";
import { baseUrl } from "./fetch/fetch-constants";
import { localUser } from "./user-storage";

export async function getMe() {
	// TODO check if this endpoint is correct
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
		enabled: true,
		retry: false,
		refetchOnMount: true,
		refetchOnWindowFocus: false,
	});
}
