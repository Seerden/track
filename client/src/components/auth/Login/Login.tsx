import { Link } from "@tanstack/react-router";
import { LucideArrowRight, LucideEye, LucideEyeOff } from "lucide-react";
import Notification from "@/components/utility/Notification/Notification";
import Containers from "@/lib/theme/components/container.style";
import F from "@/lib/theme/components/form/form.alternate.style";
import S from "../style/auth.style";
import useLogin from "./useLogin";

function Login() {
	const {
		handleInputChange,
		handleSubmit,
		passwordVisible,
		togglePasswordVisible,
		isError,
	} = useLogin();

	return (
		// TODO: this probably becomes a modal that expands from the navigation/header
		<S.Wrapper>
			<F.Form onSubmit={handleSubmit}>
				<F.FormTitle>Log in</F.FormTitle>
				{isError && (
					<Notification type="error">
						Could not log in with these credentials.
					</Notification>
				)}
				<S.Fields>
					<F.Label>
						<span>username</span>
						<F.Input
							onChange={handleInputChange}
							type="text"
							required
							name="username"
						/>
					</F.Label>
					<F.Label>
						<span>password</span>
						<div style={{ position: "relative" }}>
							<F.Input
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
					</F.Label>
				</S.Fields>
				<Containers.Row
					style={{
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<S.Submit $color="#ddd">
						log in <LucideArrowRight size={15} color="#000" strokeWidth={2} />
					</S.Submit>
					<Link
						to="/register"
						style={{
							marginTop: "1rem",
						}}
					>
						register
					</Link>
				</Containers.Row>
			</F.Form>
		</S.Wrapper>
	);
}

export default Login;
