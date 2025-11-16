import type { NewUser } from "@shared/lib/schemas/user";
import { useState } from "react";
import { useRegisterMutation } from "@/lib/hooks/query/user/register.mutation";

export default function useRegister() {
	const { mutate: register } = useRegisterMutation();

	const [newUser, setNewUser] = useState<NewUser>({
		username: "",
		password: "",
		// TODO: implement this for real
		email: "me@test.com",
	});

	const [passwordConfirm, setPasswordConfirm] = useState<string>("");

	const [passwordVisible, setPasswordVisible] = useState(false);
	function togglePasswordVisible() {
		setPasswordVisible((current) => !current);
	}

	// TODO: email needs to be validated server-side if provided
	const isValidNewUser =
		newUser.username.length > 0 &&
		newUser.password.length > 0 &&
		newUser.password == passwordConfirm;

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.name === "passwordConfirm") {
			setPasswordConfirm(e.target.value);
		} else {
			setNewUser((current) => ({
				...current,
				[e.target.name]: e.target.value,
			}));
		}
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (isValidNewUser) {
			// mutate, login and redirect
			register(newUser, {
				// TODO: of course eually we want a user to verify their
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
