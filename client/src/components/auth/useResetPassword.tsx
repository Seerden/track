import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";

function useResetPasswordMutation() {
	return useMutation<unknown, unknown, { token: string; newPassword: string }>({
		mutationFn: async ({ token, newPassword }) => {
			return await authClient.resetPassword({
				token,
				newPassword,
			});
		},
	});
}

export function useResetPassword() {
	const api = getRouteApi("/auth/reset-password");
	const search = api.useSearch();
	const { mutate: mutateResetPassword } = useResetPasswordMutation();
	const [input, setInput] = useState({
		newPassword: "",
		repeatPassword: "",
	});
	const navigate = api.useNavigate();

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (
			input.newPassword.length &&
			input.repeatPassword === input.newPassword
		) {
			mutateResetPassword(
				{
					token: search.token,
					newPassword: input.newPassword,
				},
				{
					onSuccess: () => {
						notifications.show({
							message: "You can now log in with your new password",
							position: "top-center",
						});

						navigate({ to: "/login" });
					},
				}
			);
		}
	}

	return {
		handleSubmit,
		input,
		setInput,
	};
}
