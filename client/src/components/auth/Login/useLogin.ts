import useMutateLogin from "@/lib/hooks/query/user/useMutateLogin";
import useAuthentication from "@/lib/hooks/useAuthentication";
import useRouteProps from "@/lib/hooks/useRouteProps";
import { localUser } from "@lib/user-storage";
import { type UserLogin } from "@t/data/user.types";
import { useEffect, useState } from "react";

export default function useLogin() {
	const { navigate } = useRouteProps();
	const [passwordVisible, setPasswordVisible] = useState(false);
	function togglePasswordVisible() {
		setPasswordVisible((current) => !current);
	}
	const { isLoggedIn } = useAuthentication();

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/");
		}
	}, [isLoggedIn]);

	const [userLogin, setUserLogin] = useState<UserLogin>({ username: "", password: "" });
	const { mutate: login } = useMutateLogin();

	const isValidLogin = userLogin.username.length > 0 && userLogin.password.length > 0;

	function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setUserLogin((current) => ({
			...current,
			[event.target.name]: event.target.value
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
				navigate("/");
			}
		});
	}

	return {
		passwordVisible,
		togglePasswordVisible,
		onInputChange,
		onSubmit
	};
}
