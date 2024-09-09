import { useState } from "react";
import useLoginMutation from "../../lib/use-login-mutation";
import { localUser } from "../../lib/user-storage";
import { type UserLogin } from "../../types/server/user.types";

export default function useLogin() {
	const [passwordVisible, setPasswordVisible] = useState(false);
	function togglePasswordVisible() {
		setPasswordVisible((current) => !current);
	}

	const [userLogin, setUserLogin] = useState<UserLogin>({ username: "", password: "" });
	const { mutate: login } = useLoginMutation();

	const isValidLogin = userLogin.username.length > 0 && userLogin.password.length > 0;

	function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setUserLogin((current) => ({
			...current,
			[event.target.name]: event.target.value,
		}));
	}

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!isValidLogin) {
			// TODO: show error state
			return;
		}

		login(userLogin, {
			onSuccess: ({ user }) => {
				// redirect if we're on a login page, otherwise just close the
				// modal. probably we redirect to the user's home page, because I
				// expect almost everyting will be behind a login wall.
				localUser.set(user);
			},
		});
	}

	return {
		passwordVisible,
		togglePasswordVisible,
		userLogin,
		onInputChange,
		onSubmit,
	};
}
