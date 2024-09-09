import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Data } from "../types/query.types";
import { User, UserLogin } from "../types/server/user.types";
import { createPostConfig } from "./fetch/create-post-config";
import { baseUrl } from "./fetch/fetch-constants";
import { localUser } from "./user-storage";

async function postLogin(user: UserLogin) {
	return (await fetch(`${baseUrl}/auth/login`, createPostConfig({ user }))).json();
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
