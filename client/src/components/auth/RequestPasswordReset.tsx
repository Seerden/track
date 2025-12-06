import { notifications } from "@mantine/notifications";
import { z } from "@shared/lib/zod";
import { useMutation } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";
import F from "@/lib/theme/components/form/form.alternate.style";
import S from "./style/auth.style";

function useRequestResetMutation() {
	return useMutation({
		mutationFn: async (email: string) => {
			return await authClient.requestPasswordReset({
				email,
			});
		},
	});
}

export default function RequestPasswordReset() {
	const [email, setEmail] = useState("");
	const { mutate } = useRequestResetMutation();

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (z.email().parse(email)) {
			mutate(email, {
				onSuccess: () => {
					console.log("Successfully requested password reset");
					notifications.show({
						position: "top-center",
						message: `If there is an account associated with the 
                     email address you provided, we will email you 
                     a link to use to reset your password`,
					});
				},
			});
		}
	}

	return (
		<S.Wrapper>
			<F.Form onSubmit={handleSubmit}>
				<F.FormTitle>Request password reset</F.FormTitle>

				<S.Fields>
					<F.Label>
						<span>Email</span>
						<F.Input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
						/>
					</F.Label>
				</S.Fields>

				<F.Submit type="submit">Request password reset</F.Submit>
			</F.Form>
		</S.Wrapper>
	);
}
