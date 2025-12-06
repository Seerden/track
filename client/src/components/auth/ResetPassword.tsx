import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { produce } from "immer";
import { type FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";
import F from "@/lib/theme/components/form/form.alternate.style";
import S from "./style/auth.style";

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

export default function ResetPassword() {
	const api = getRouteApi("/auth/reset-password");
	const search = api.useSearch();
	const { mutate: mutateResetPassword } = useResetPasswordMutation();
	const [input, setInput] = useState({
		newPassword: "",
		repeatPassword: "",
	});

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
					},
				}
			);
		}
	}

	return (
		<>
			<S.Wrapper>
				<F.Form onSubmit={handleSubmit}>
					<F.Label>
						<span>New password</span>
						<F.Input
							value={input.newPassword}
							type="password"
							onChange={(e) =>
								setInput(
									produce((draft) => {
										draft.newPassword = e.target.value;
									})
								)
							}
						/>
					</F.Label>
					<F.Label>
						<span>Repeat new password</span>
						<F.Input
							value={input.repeatPassword}
							type="password"
							onChange={(e) =>
								setInput(
									produce((draft) => {
										draft.repeatPassword = e.target.value;
									})
								)
							}
						/>
					</F.Label>
					<F.Submit type="submit">Confirm password reset</F.Submit>
				</F.Form>
			</S.Wrapper>
		</>
	);
}
