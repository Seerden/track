import { notifications } from "@mantine/notifications";
import { z } from "@shared/lib/zod";
import { useMutation } from "@tanstack/react-query";
import { LucideAsterisk } from "lucide-react";
import { type FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { colors } from "@/lib/theme/colors";

function useRequestResetMutation() {
	return useMutation({
		mutationFn: async (email: string) => {
			return await authClient.requestPasswordReset({
				email,
			});
		},
	});
}

export function useRequestPasswordReset() {
	const { currentUser } = useAuthentication();

	const [email, setEmail] = useState(currentUser?.email ?? "");
	const { mutate } = useRequestResetMutation();

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (z.email().parse(email)) {
			mutate(email, {
				onError: (error) => {
					notifications.show({
						position: "top-center",
						color: colors.red.main,
						message: error.message ?? error.name,
					});
				},
				onSuccess: ({ error, data }) => {
					if (error) {
						notifications.show({
							position: "top-center",
							color: "orangered",
							message: error.message ?? error.code,
						});
					} else {
						if (data.message) {
							notifications.show({
								position: "top-center",
								icon: <LucideAsterisk />,
								color: "royalblue",
								message: data.message,
							});
						}
					}
				},
			});
		}
	}

	return {
		handleSubmit,
		email,
		setEmail,
	};
}
