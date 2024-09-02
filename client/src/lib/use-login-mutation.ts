import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Data } from "../types/query.types";
import { User, UserLogin } from "../types/server/user.types";
import { baseUrl, postConfig } from "./fetch/fetch-constants";
import { localUser } from "./user-storage";

async function postLogin(user: UserLogin) {
	return (
		await fetch(`${baseUrl}/user/login`, {
			...postConfig,
			body: JSON.stringify({ user }),
		})
	).json();
}

export default function useLoginMutation() {
	const client = useQueryClient();

	return useMutation<Data<"user", User>, unknown, UserLogin>({
		mutationKey: ["me"],
		mutationFn: postLogin,
		onSuccess: ({ user }) => {
			localUser.set(user);
			client.setQueryData(["me"], user);
		},
	});
}
