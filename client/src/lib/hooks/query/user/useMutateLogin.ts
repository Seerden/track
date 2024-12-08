import userService from "@/lib/fetch/user-service";
import { queryClient } from "@/lib/query-client";
import { mk, qk } from "@/lib/query-keys";
import { localUser } from "@/lib/user-storage";
import type { Data } from "@/types/query.types";
import type { User, UserLogin } from "@t/data/user.types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateLogin() {
	return useMutation<Data<"user", User>, unknown, UserLogin>({
		mutationKey: mk.user.login,
		async mutationFn(user) {
			return userService.login(user);
		},
		onSuccess: ({ user }) => {
			localUser.set(user);
			queryClient.setQueryData(qk.user.me, { user });
		}
	});
}
