import type { NewUser } from "@shared/lib/schemas/user";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLoginMutation } from "@/lib/hooks/query/user/login.mutation";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { localUser } from "@/lib/user-storage";

export default function useLogin() {
	const navigate = useNavigate();
	const [passwordVisible, setPasswordVisible] = useState(false);
	function togglePasswordVisible() {
		setPasswordVisible((current) => !current);
	}
	const { isLoggedIn } = useAuthentication();

	useEffect(() => {
		if (isLoggedIn) {
			navigate({ to: "/" });
		}
	}, [isLoggedIn]);

	const [userLogin, setUserLogin] = useState<NewUser>({
		username: "",
		password: "",
	});
	const { mutate: login, isError } = useLoginMutation();

	const isValidLogin =
		!!userLogin.username.length && !!userLogin.password.length;

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setUserLogin((current) => ({
			...current,
			[e.target.name]: e.target.value,
		}));
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

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
				navigate({ to: "/" });
			},
		});
	}

	return {
		passwordVisible,
		isError,
		togglePasswordVisible,
		handleInputChange,
		handleSubmit,
	};
}
