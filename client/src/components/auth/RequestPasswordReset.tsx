import { LucideSendHorizontal } from "lucide-react";
import { useRequestPasswordReset } from "@/components/auth/useRequestPasswordReset";
import F from "@/lib/theme/components/form/form.alternate.style";
import S from "./style/auth.style";

export default function RequestPasswordReset() {
	const { email, handleSubmit, setEmail } = useRequestPasswordReset();

	return (
		<S.Wrapper>
			<F.Form onSubmit={handleSubmit}>
				<F.FormTitle>Request password reset</F.FormTitle>

				<S.Fields>
					<F.Label>
						<span>Email</span>
						<F.Input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
						/>
					</F.Label>
				</S.Fields>

				<F.Submit type="submit">
					<span>Request password reset</span>
					<LucideSendHorizontal size={18} strokeWidth="1.5" />
				</F.Submit>
			</F.Form>
		</S.Wrapper>
	);
}
