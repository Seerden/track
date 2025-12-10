import { TextInput } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { LucideArrowRight, LucideEye, LucideEyeClosed } from "lucide-react";
import Notification from "@/components/utility/Notification/Notification";
import { AnimatedIcon } from "@/lib/animate/AnimatedIcon";
import Containers from "@/lib/theme/components/container.style";
import F from "@/lib/theme/components/form/form.alternate.style";
import { spacingValue } from "@/lib/theme/snippets/spacing";
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
						<TextInput onChange={handleInputChange} required name="username" />
					</F.Label>
					<F.Label>
						<span>password</span>
						<div style={{ position: "relative" }}>
							{/* TOOD: I want this to _be_ a mantine TextInput, but use the styling 
                        of F.Input. For now, it's like this so I can easily have the 
                        AnimatedIcon in rightSection. */}
							<TextInput
								onChange={handleInputChange}
								type={passwordVisible ? "text" : "password"}
								required
								name="password"
								rightSection={
									<S.ShowPassword
										tabIndex={-1}
										type="button"
										onClick={togglePasswordVisible}
										value={`${passwordVisible ? "Hide" : "Show"} password`}
									>
										<AnimatedIcon
											off={<LucideEyeClosed />}
											on={<LucideEye />}
											intermediate={null}
											size={18}
											state={passwordVisible}
										/>
									</S.ShowPassword>
								}
							/>
						</div>
					</F.Label>
				</S.Fields>
				<Containers.Row
					style={{
						justifyContent: "space-between",
						alignItems: "center",
						gap: spacingValue.small,
					}}
				>
					<F.Submit $minimal type="submit">
						log in <LucideArrowRight size={15} strokeWidth={2} />
					</F.Submit>
					<Link
						to="/register"
						style={{
							marginTop: "1rem",
						}}
					>
						register
					</Link>
					<Link
						to="/auth/request-password-reset"
						style={{ marginTop: spacingValue.medium }}
					>
						forgot password
					</Link>
				</Containers.Row>
			</F.Form>
		</S.Wrapper>
	);
}

export default Login;
