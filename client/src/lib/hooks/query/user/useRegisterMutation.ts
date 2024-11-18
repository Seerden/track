import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { baseUrl } from "@/lib/fetch/fetch-constants";
import { mk } from "@/lib/query-keys";
import { useMutation } from "@tanstack/react-query";
import type { Data } from "@type/query.types";
import type { NewUser, User } from "@type/server/user.types";

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
