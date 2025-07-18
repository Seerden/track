import F from "@/lib/theme/components/form/form.alternate.style";
import { LucideArrowRight, LucideEye, LucideEyeOff } from "lucide-react";
import S from "../style/auth.style";
import useRegister from "./useRegister";

function Register() {
	const { handleInputChange, handleSubmit, passwordVisible, togglePasswordVisible } =
		useRegister();
	return (
		// TODO: like in the login form, this probably becomes a modal that expands from the navigation/header
		<S.Wrapper>
			<F.Form onSubmit={handleSubmit}>
				<F.FormTitle>Register</F.FormTitle>
				<S.Fields>
					<F.Label>
						<span>username</span>
						<F.Input
							onChange={handleInputChange}
							type="text"
							required
							placeholder="Username"
							name="username"
						/>
					</F.Label>
					<F.Label>
						<span>email</span>
						<F.Input onChange={handleInputChange} type="email" name="email" />
					</F.Label>
					{/* TODO: instead of using a label, use a fieldset, and try the 
                  styling from ItemTemplateForm  */}
					<S.Column>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								gap: "0.5rem"
							}}
						>
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
							<F.Label>
								<span>confirm password</span>
								<div style={{ position: "relative" }}>
									<F.Input
										onChange={handleInputChange}
										type={passwordVisible ? "text" : "password"}
										required
										name="passwordConfirm"
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
						</div>
					</S.Column>
				</S.Fields>
				<S.Submit $color="theme">
					register <LucideArrowRight size={15} color="black" />
				</S.Submit>
			</F.Form>
		</S.Wrapper>
	);
}

export default Register;
