import type { NewUser } from "@shared/lib/schemas/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { User } from "better-auth";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { localUser } from "@/lib/user-storage";

function useBetterAuthLoginMutation() {
	return useMutation<User | undefined, unknown, NewUser>({
		mutationFn: async (user) => {
			const u = await authClient.signIn.username(user);
			return u.data?.user;
		},
	});
}

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
		// TODO: implement this for real
		email: "me@test.com",
	});
	// const { mutate: login, isError } = useLoginMutation();
	// TODO: make sure to refactor useLoginMutation ^ properly, then remove it in
	// favor of this one
	const { mutate: login, isError } = useBetterAuthLoginMutation();

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
			onSuccess: (user) => {
				if (!user) {
					// TODO: this shouldn't happen.
					return;
				}
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
