import userService from "@/lib/fetch/user-service";
import { mk } from "@/lib/query-keys";
import type { UserData } from "@/types/data.types";
import type { NewUser } from "@shared/types/data/user.types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export default function useMutateRegister() {
	const navigate = useNavigate();

	return useMutation<UserData, unknown, NewUser>({
		async mutationFn(newUser) {
			return userService.register(newUser);
		},
		mutationKey: mk.user.register,
		onSuccess: () => navigate({ to: "/" })
	});
}
