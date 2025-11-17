import { css } from "@emotion/react";
import {
	LucideShieldUser,
	LucideToggleLeft,
	LucideToggleRight,
} from "lucide-react";
import { useProfile } from "@/components/user/profile/useProfile";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import { colors } from "@/lib/theme/colors";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import { Label } from "@/lib/theme/components/form/label.style";
import { Title } from "@/lib/theme/components/text/title.style";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import S from "./style/Profile.style";

/** Use this when rendering Profile standalone, i.e. not within a Popover or
 * similar component.
 * @note (TRK-139) currently we only render Profile as ProfileMenu inside
 * Navbar. */
export default function Profile() {
	const { handlers, disableNotifications, currentUser, logout } = useProfile();

	// this component will be wrapped in Protected, so this won't happen, but it
	// makes typescript happy.
	if (!currentUser) {
		return null;
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

			<Containers.Column gap={"small"} style={{ padding: spacingValue.medium }}>
				<Title.Menu.SectionHeader>Settings</Title.Menu.SectionHeader>
				<S.SettingsGrid>
					<Title.Menu.SubsectionHeader>
						Notifications
					</Title.Menu.SubsectionHeader>
					<Label.Settings.WithToggle>
						<span>Disable all notifications?</span>

						<Checkbox
							checked={disableNotifications}
							onChange={handlers.toggleNotifications}
							IconOff={LucideToggleLeft}
							IconOn={LucideToggleRight}
							size={25}
						/>
					</Label.Settings.WithToggle>

					<Title.Menu.SubsectionHeader>Other</Title.Menu.SubsectionHeader>
					<Label.Settings.WithToggle>
						<span>Stub</span>
						<Checkbox
							checked={true}
							onChange={() => {
								return;
							}}
							IconOff={LucideToggleLeft}
							IconOn={LucideToggleRight}
							size={25}
						/>
					</Label.Settings.WithToggle>
				</S.SettingsGrid>

				<Buttons.Action.Minimal
					type="button"
					onClick={() => logout()}
					style={{ marginTop: spacingValue.medium, alignSelf: "flex-end" }}
				>
					Log out
				</Buttons.Action.Minimal>
			</Containers.Column>
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
