import {
	LucideShieldUser,
	LucideToggleLeft,
	LucideToggleRight,
} from "lucide-react";
import type { ChangeEvent } from "react";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import useAuthentication from "@/lib/hooks/useAuthentication";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import { Label } from "@/lib/theme/components/form/label.style";
import { Title } from "@/lib/theme/components/text/title.style";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import S from "./style/Profile.style";

export default function Profile() {
	const { currentUser, logout } = useAuthentication();

	// this component will be wrapped in Protected, so this won't happen, but it
	// makes typescript happy.
	if (!currentUser) {
		return null;
	}

	const disableNotifications = false; // TODO: useQuery

	function handleToggleDisableNotifications(e: ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		// TODO: mutation
	}

	const handlers = {
		toggleNotifications: handleToggleDisableNotifications,
	};

	return (
		<section
			style={{
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Title.Menu.Header>
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
						/>
					</Label.Settings.WithToggle>

					<Title.Menu.SubsectionHeader>Other</Title.Menu.SubsectionHeader>
					<Label.Settings.WithToggle>
						<span>Stub</span>
						<Checkbox
							checked={true}
							IconOff={LucideToggleLeft}
							IconOn={LucideToggleRight}
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
		</section>
	);
}
