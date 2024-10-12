import { useMutation } from "@tanstack/react-query";
import { Data } from "@type/query.types";
import { NewUser, User } from "@type/server/user.types";
import { createRequestConfig } from "../fetch/create-request-config";
import { baseUrl } from "../fetch/fetch-constants";

async function postRegister(newUser: NewUser) {
	return (
		await fetch(`${baseUrl}/auth/register`, createRequestConfig.post({ newUser }))
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
