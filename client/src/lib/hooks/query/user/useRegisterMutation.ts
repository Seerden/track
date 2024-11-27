import api from "@/lib/fetch/api";
import useRouteProps from "@/lib/hooks/useRouteProps";
import { mk } from "@/lib/query-keys";
import type { UserData } from "@/types/data.types";
import type { NewUser } from "@t/data/user.types";
import { useMutation } from "@tanstack/react-query";

async function postRegister(newUser: NewUser) {
	return api.post<{ newUser: NewUser }, UserData>({
		url: "/auth/register",
		body: { newUser }
	});
}

export default function useRegisterMutation() {
	const { navigate } = useRouteProps();

	return useMutation<UserData, unknown, NewUser>({
		async mutationFn(newUser) {
			return postRegister(newUser);
		},
		mutationKey: mk.user.register,
		onSuccess: () => navigate("/")
	});
}
