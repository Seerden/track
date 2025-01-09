import Notification from "@/components/utility/Notification/Notification";
import F from "@/lib/theme/components/form/form.alternate.style";
import { LucideArrowRight, LucideEye, LucideEyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import S from "../style/auth.style";
import useLogin from "./useLogin";

function Login() {
	const {
		handleInputChange,
		handleSubmit,
		passwordVisible,
		togglePasswordVisible,
		isError
	} = useLogin();

	return (
		// TODO: this probably becomes a modal that expands from the navigation/header
		<S.Wrapper>
			<F.Form onSubmit={handleSubmit}>
				<F.FormTitle>Log in</F.FormTitle>
				{isError && (
					<Notification type="success">
						Could not log in with these credentials.
					</Notification>
				)}
				<S.Fields>
					<F.Label>
						<span>username</span>
						<input
							onChange={handleInputChange}
							type="text"
							required
							name="username"
						/>
					</F.Label>
					<S.PasswordLabel>
						<span>password</span>
						<div style={{ position: "relative" }}>
							<input
								onChange={handleInputChange}
								type={passwordVisible ? "text" : "password"}
								required
								name="password"
							/>
							<S.ShowPassword
								tabIndex={-1}
								type="button"
								onClick={togglePasswordVisible}
								value={`${passwordVisible ? "Hide" : "Show"} password`}
							>
								{passwordVisible ? (
									<LucideEyeOff size={24} />
								) : (
									<LucideEye size={24} />
								)}
							</S.ShowPassword>
						</div>
					</S.PasswordLabel>
				</S.Fields>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center"
					}}
				>
					<S.Submit $color="theme">
						log in <LucideArrowRight size={15} color="black" strokeWidth={2} />
					</S.Submit>
					<Link
						to="/register"
						style={{
							marginTop: "1rem"
						}}
					>
						register
					</Link>
				</div>
			</F.Form>
		</S.Wrapper>
	);
}

export default Login;
