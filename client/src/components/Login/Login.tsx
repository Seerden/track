import useLogin from "./use-login";

function Login() {
	const login = useLogin();

	return (
		// TODO: this probably becomes a modal that expands from the navigation/header
		<>
			<h1>Login</h1>
			<form onSubmit={login.onSubmit}>
				<input
					onChange={(e) => login.onInputChange(e)}
					type="text"
					required
					placeholder="Username"
					name="username"
				/>
				<span>
					<input
						onChange={(e) => login.onInputChange(e)}
						type={login.passwordVisible ? "text" : "password"}
						required
						name="password"
						placeholder="Password"
					/>
					<input
						type="button"
						onClick={() => login.togglePasswordVisible()}
						value={`${login.passwordVisible ? "Hide" : "Show"} password`}
					/>
				</span>
				<button type="submit">Login</button>
			</form>
		</>
	);
}

export default Login;
