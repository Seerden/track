import { useMutation } from "@tanstack/react-query";
import { Data } from "../types/query.types";
import { NewUser, User } from "../types/server/user.types";
import { baseUrl, postConfig } from "./fetch/fetch-constants";

async function postRegister(newUser: NewUser) {
	return (
		await fetch(`${baseUrl}/auth/register`, {
			...postConfig,
			body: JSON.stringify({ newUser }),
		})
	).json();
}

export default function useRegisterMutation() {
	return useMutation<Data<"user", User>, unknown, NewUser>({
		async mutationFn(newUser) {
			return postRegister(newUser);
		},
		mutationKey: ["register"],
	});
}
