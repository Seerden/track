import userService from "@/lib/fetch/user-service";
import useRouteProps from "@/lib/hooks/useRouteProps";
import { mk } from "@/lib/query-keys";
import type { UserData } from "@/types/data.types";
import type { NewUser } from "@shared/types/data/user.types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateRegister() {
	const { navigate } = useRouteProps();

	return useMutation<UserData, unknown, NewUser>({
		async mutationFn(newUser) {
			return userService.register(newUser);
		},
		mutationKey: mk.user.register,
		onSuccess: () => navigate("/")
	});
}
