import { css } from "@emotion/react";
import { useMutation } from "@tanstack/react-query";
import { LucideShieldUser } from "lucide-react";
import Settings from "@/components/user/profile/settings/Settings";
import { authClient } from "@/lib/auth-client";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { colors } from "@/lib/theme/colors";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import { Title } from "@/lib/theme/components/text/title.style";
import S from "./style/Profile.style";

// TODO: finalize this implementation
function useRequestPasswordResetEmailMutation() {
	return useMutation({
		mutationFn: async (email: string) => {
			const response = await authClient.requestPasswordReset({ email });
			console.log(response);
		},
	});
}

/** Use this when rendering Profile standalone, i.e. not within a Popover or
 * similar component.
 * @note (TRK-139) currently we only render Profile as ProfileMenu inside
 * Navbar. */
export default function Profile() {
	const { currentUser } = useAuthentication();
	const { mutate: mutateRequestResetPassword } =
		useRequestPasswordResetEmailMutation();

	// this component will be wrapped in Protected, so this won't happen, but it
	// makes typescript happy.
	if (!currentUser) {
		return null;
	}

	function sendPasswordReset() {
		if (currentUser) {
			mutateRequestResetPassword(currentUser.email, {
				onSuccess: () => {
					console.log("send password reset email");
				},
			});
		}
	}

	return (
		<Containers.Column as="section">
			<Title.Menu.Header
				css={css`
            * {
               color: ${colors.light[0]};
            }
         `}
			>
				<LucideShieldUser size={23} /> <span>Account</span>
			</Title.Menu.Header>

			{/* TODO: WIP */}
			<Buttons.Unstyled type="button" onClick={sendPasswordReset}>
				reset password
			</Buttons.Unstyled>
			<Settings />
		</Containers.Column>
	);
}

/** Use this when rendering Profile inside a Popover. */
export function ProfileMenu() {
	return (
		<S.Menu>
			<Profile />
		</S.Menu>
	);
}
