import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { baseUrl } from "@/lib/fetch/fetch-constants";
import { mk } from "@/lib/query-keys";
import type { Data } from "@/types/query.types";
import type { NewUser, User } from "@t/data/user.types";
import { useMutation } from "@tanstack/react-query";

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
		mutationKey: mk.user.register
	});
}
