import { notifications } from "@mantine/notifications";
import { z } from "@shared/lib/zod";
import { useMutation } from "@tanstack/react-query";
import { BetterAuthError } from "better-auth";
import { produce } from "immer";
import { LucideAlertCircle, LucideAtSign } from "lucide-react";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const registerInputSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
	username: z.string().min(3),
	name: z.string().min(3),
});

type RegisterInput = Pick<
	Parameters<typeof authClient.signUp.email>[0],
	"email" | "password" | "username" | "name"
>;

function useRegisterMutation() {
	return useMutation({
		mutationFn: async (input: RegisterInput) => {
			return await authClient.signUp.email({
				email: input.email,
				password: input.password,
				username: input.username,
				name: input.name,
			});
		},
	});
}

export function useRegister() {
	const { mutate: register, isError, isSuccess, reset } = useRegisterMutation();

	const [newUser, setNewUser] = useState<Partial<RegisterInput>>({});

	const [passwordConfirm, setPasswordConfirm] = useState<string>("");

	const [passwordVisible, setPasswordVisible] = useState(false);
	function togglePasswordVisible() {
		setPasswordVisible((current) => !current);
	}

	// When the input changes, we reset the success/error state of the mutation,
	// so the user can try again on error or success.
	useEffect(() => {
		reset();
	}, [newUser]);

	const parsedUser = registerInputSchema.safeParse(newUser);
	const isValidNewUser =
		parsedUser.success && parsedUser.data.password === passwordConfirm;

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.name === "passwordConfirm") {
			setPasswordConfirm(e.target.value);
		} else {
			setNewUser(
				produce((draft) => {
					draft[e.target.name as keyof RegisterInput] = e.target.value;

					if (e.target.name === "username") {
						draft["name"] = e.target.value;
					}
				})
			);
		}
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (isValidNewUser) {
			register(parsedUser.data, {
				onError: (error) => {
					if (error instanceof BetterAuthError) {
						notifications.show({
							position: "top-center",
							color: "orangered",
							icon: <LucideAlertCircle />,
							message: error.message,
						});
					}
				},
				onSuccess: (data) => {
					if (data.error) {
						notifications.show({
							position: "top-center",
							icon: <LucideAlertCircle size={23} />,
							color: "red",
							autoClose: false,
							withCloseButton: true,
							title: "Registration failed",
							message: data.error.message ?? data.error.code,
						});
					} else {
						notifications.show({
							position: "top-center",
							icon: <LucideAtSign size={23} />,
							color: "royalblue",
							message: `If the username and email you've provided have not yet been
									taken, you will receive an email containing a verification
									link. Once your email is verified, you'll be able to log in.`,
						});
					}
				},
			});
		}
	}

	return {
		handleInputChange,
		handleSubmit,
		passwordVisible,
		togglePasswordVisible,
		isError,
		isSuccess,
	};
}
