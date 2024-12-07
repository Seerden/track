import { postLogin } from "@/lib/fetch/user-service";
import { mk, qk } from "@/lib/query-keys";
import { localUser } from "@/lib/user-storage";
import type { Data } from "@/types/query.types";
import type { User, UserLogin } from "@t/data/user.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useMutateLogin() {
	// TODO: I think this is the only place where we use useQueryClient instead
	// of importing queryClient directly. What's the difference?
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
