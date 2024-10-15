import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Data } from "@type/query.types";
import type { User, UserLogin } from "@type/server/user.types";
import { createRequestConfig } from "../fetch/create-request-config";
import { baseUrl } from "../fetch/fetch-constants";
import { localUser } from "../user-storage";

async function postLogin(user: UserLogin) {
	return (
		await fetch(`${baseUrl}/auth/login`, createRequestConfig.post({ user }))
	).json();
}

export default function useLoginMutation() {
	const client = useQueryClient();

	return useMutation<Data<"user", User>, unknown, UserLogin>({
		mutationKey: ["me"],
		async mutationFn(user) {
			return postLogin(user);
		},
		onSuccess: ({ user }) => {
			localUser.set(user);
			client.setQueryData(["me"], { user });
		},
	});
}
