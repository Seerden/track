import { z } from "@shared/lib/zod";
import { useMutation } from "@tanstack/react-query";
import { produce } from "immer";
import { useState } from "react";
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
	return useMutation<
		ReturnType<typeof authClient.signUp.email>,
		unknown,
		RegisterInput
	>({
		mutationFn: (input) =>
			authClient.signUp.email({
				email: input.email,
				password: input.password,
				username: input.username,
				name: input.name,
			}),
	});
}

export default function useRegisterBetterAuth() {
	const { mutate: register } = useRegisterMutation();

	const [newUser, setNewUser] = useState<Partial<RegisterInput>>({});

	const [passwordConfirm, setPasswordConfirm] = useState<string>("");

	const [passwordVisible, setPasswordVisible] = useState(false);
	function togglePasswordVisible() {
		setPasswordVisible((current) => !current);
	}

	const parsedUser = registerInputSchema.safeParse(newUser);
	// TODO: email needs to be validated server-side if provided
	const isValidNewUser = parsedUser.success;

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
		console.log({ isValidNewUser, parsedUser });
		if (isValidNewUser) {
			// mutate, login and redirect
			register(parsedUser.data, {
				// TODO: of course eventually we want a user to verify their
				// account, but for dev purposes this approach is good enough
				onSuccess: () => {
					// TODO: login and redirect
				},
			});
		}

		// otherwise show error state depending on what's wrong
	}

	return {
		handleInputChange,
		handleSubmit,
		passwordVisible,
		togglePasswordVisible,
	};
}
