import { useState } from "react";
import useRegisterMutation from "../../lib/use-register-mutation";
import { NewUser } from "../../types/server/user.types";

export default function useRegister() {
	const { mutate: register } = useRegisterMutation();

	const [newUser, setNewUser] = useState<NewUser>({
		username: "",
		password: "",
		email: "",
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

	function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.name === "passwordConfirm") {
			setPasswordConfirm(event.target.value);
		} else {
			setNewUser((current) => ({
				...current,
				[event.target.name]: event.target.value,
			}));
		}
	}

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (isValidNewUser) {
			// mutate, login and redirect
			register(newUser, {
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
		onInputChange,
		onSubmit,
		passwordVisible,
		togglePasswordVisible,
	};
}
