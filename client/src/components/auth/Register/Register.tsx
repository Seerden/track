import { TextInput } from "@mantine/core";
import { LucideArrowRight, LucideEye, LucideEyeClosed } from "lucide-react";
import { useRegister } from "@/components/auth/Register/useRegister";
import { AnimatedIcon } from "@/lib/animate/AnimatedIcon";
import F from "@/lib/theme/components/form/form.alternate.style";
import S from "../style/auth.style";

/** @todo (TRK-317) like Login.tsx, I want the input fields to _be_ mantine
 * inputs, but _use_ F.Input styling. */
export default function RegisterBetterAuth() {
	const {
		handleInputChange,
		handleSubmit,
		passwordVisible,
		togglePasswordVisible,
		isSuccess,
		isError,
	} = useRegister();

	const showPasswordIcon = (
		<S.ShowPassword
			tabIndex={0}
			type="button"
			onClick={togglePasswordVisible}
			value={`${passwordVisible ? "Hide" : "Show"} password`}
		>
			<AnimatedIcon
				intermediate={null}
				on={<LucideEye />}
				off={<LucideEyeClosed />}
				state={passwordVisible}
				size={18}
			/>
		</S.ShowPassword>
	);

	return (
		// TODO: like in the login form, this probably becomes a modal that expands from the navigation/header
		<S.Wrapper>
			<F.Form onSubmit={handleSubmit}>
				<F.FormTitle>Register</F.FormTitle>
				<S.Fields>
					<F.Label>
						<span>username</span>
						<TextInput
							onChange={handleInputChange}
							type="text"
							required
							placeholder="Username"
							name="username"
						/>
					</F.Label>
					<F.Label>
						<span>email</span>
						<TextInput onChange={handleInputChange} type="email" name="email" />
					</F.Label>
					{/* TODO: instead of using a label, use a fieldset, and try the 
                  styling from ItemTemplateForm  */}
					<S.Column>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								gap: "0.5rem",
							}}
						>
							<F.Label>
								<span>password</span>
								<div style={{ position: "relative" }}>
									<TextInput
										onChange={handleInputChange}
										type={passwordVisible ? "text" : "password"}
										required
										name="password"
										rightSection={showPasswordIcon}
									/>
								</div>
							</F.Label>
							<F.Label>
								<span>confirm password</span>
								<div style={{ position: "relative" }}>
									<TextInput
										onChange={handleInputChange}
										type={passwordVisible ? "text" : "password"}
										required
										name="passwordConfirm"
										rightSection={showPasswordIcon}
									/>
								</div>
							</F.Label>
						</div>
					</S.Column>
				</S.Fields>
				<F.Submit
					$minimal
					type="submit"
					style={{ marginTop: "1rem" }}
					disabled={isError || isSuccess}
				>
					register <LucideArrowRight size={15} />
				</F.Submit>
			</F.Form>
		</S.Wrapper>
	);
}
