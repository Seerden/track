import useRegister from "./use-register";

function Register() {
	const register = useRegister();
	return (
		// TODO: like in the login form, this probably becomes a modal that expands from the navigation/header
		<>
			<h1>Register</h1>
			<form onSubmit={(e) => register.onSubmit(e)}>
				<input
					onChange={(e) => register.onInputChange(e)}
					type="text"
					required
					placeholder="Username"
					name="username"
				/>
				<input
					onChange={(e) => register.onInputChange(e)}
					type="email"
					placeholder="e-mail address"
					name="email"
				/>
				<input
					onChange={(e) => register.onInputChange(e)}
					type="password"
					required
					placeholder="Password"
					name="password"
				/>
				<input
					onChange={(e) => register.onInputChange(e)}
					type="password"
					required
					placeholder="Confirm Password"
					name="passwordConfirm"
				/>
				<button type="submit">Register</button>
			</form>
		</>
	);
}

export default Register;
