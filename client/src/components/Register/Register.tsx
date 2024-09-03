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
				<div>
					<input
						onChange={(e) => register.onInputChange(e)}
						type={register.passwordVisible ? "text" : "password"}
						required
						placeholder="Password"
						name="password"
					/>
					<input
						onChange={(e) => register.onInputChange(e)}
						type={register.passwordVisible ? "text" : "password"}
						required
						placeholder="Confirm Password"
						name="passwordConfirm"
					/>
					<button onClick={() => register.togglePasswordVisible()}>
						{register.passwordVisible ? "Hide" : "Show"} password
					</button>
				</div>
				<button type="submit">Register</button>
			</form>
		</>
	);
}

export default Register;
