import { css } from "@emotion/react";
import { Link } from "@tanstack/react-router";
import { LucideChevronRight, LucideShieldUser } from "lucide-react";
import Menu from "@/components/layout/Header/style/menu.style";
import Settings from "@/components/user/profile/settings/Settings";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { colors } from "@/lib/theme/colors";
import Containers from "@/lib/theme/components/container.style";
import { Title } from "@/lib/theme/components/text/title.style";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import S from "./style/Profile.style";

/** Use this when rendering Profile standalone, i.e. not within a Popover or
 * similar component.
 * @note (TRK-139) currently we only render Profile as ProfileMenu inside
 * Navbar. */
export default function Profile() {
	const { currentUser } = useAuthentication();

	// this component will be wrapped in Protected, so this won't happen, but it
	// makes typescript happy.
	if (!currentUser) {
		return null;
	}

	return (
		<Containers.Column>
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
			<Link to="/auth/account">
				<Menu.Link
					style={{
						maxWidth: "max-content",
						margin: spacingValue.small,
						marginBottom: 0,
						justifySelf: "flex-end",
					}}
				>
					Profile <LucideChevronRight size={15} />
				</Menu.Link>
			</Link>{" "}
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
