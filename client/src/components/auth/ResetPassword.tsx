import { produce } from "immer";
import { useResetPassword } from "@/components/auth/useResetPassword";
import F from "@/lib/theme/components/form/form.alternate.style";
import S from "./style/auth.style";

export default function ResetPassword() {
	const { handleSubmit, input, setInput } = useResetPassword();

	return (
		<>
			<S.Wrapper>
				<F.Form onSubmit={handleSubmit}>
					<F.Label>
						<span>New password</span>
						<F.Input
							value={input.newPassword}
							type="password"
							onChange={(e) =>
								setInput(
									produce((draft) => {
										draft.newPassword = e.target.value;
									})
								)
							}
						/>
					</F.Label>
					<F.Label>
						<span>Repeat new password</span>
						<F.Input
							value={input.repeatPassword}
							type="password"
							onChange={(e) =>
								setInput(
									produce((draft) => {
										draft.repeatPassword = e.target.value;
									})
								)
							}
						/>
					</F.Label>
					<F.Submit type="submit">Confirm password reset</F.Submit>
				</F.Form>
			</S.Wrapper>
		</>
	);
}
