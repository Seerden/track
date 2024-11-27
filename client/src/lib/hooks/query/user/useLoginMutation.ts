import api from "@/lib/fetch/api";
import { mk, qk } from "@/lib/query-keys";
import { localUser } from "@/lib/user-storage";
import type { Data } from "@/types/query.types";
import type { User, UserLogin } from "@t/data/user.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function postLogin(user: UserLogin) {
	return api.post<{ user: UserLogin }, Data<"user", User>>({
		url: "/auth/login",
		body: { user }
	});
}

export default function useLoginMutation() {
	const client = useQueryClient();

	return useMutation<Data<"user", User>, unknown, UserLogin>({
		mutationKey: mk.user.login,
		async mutationFn(user) {
			return postLogin(user);
		},
		onSuccess: ({ user }) => {
			localUser.set(user);
			client.setQueryData(qk.user.me, { user });
		}
	});
}
