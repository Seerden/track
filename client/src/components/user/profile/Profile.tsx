import { css } from "@emotion/react";
import {
	LucideCheck,
	LucideCheckCheck,
	LucideCircleDot,
	LucideShieldUser,
	LucideToggleLeft,
	LucideToggleRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
	HABIT_FILTER,
	type HabitFilter,
} from "@/components/Today/habits/useHabits";
import SettingsRadioGroup from "@/components/user/profile/settings/SettingsRadioGroup";
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
	const [defaultHabitSelection, setDefaultHabitSelection] =
		useState<HabitFilter>(HABIT_FILTER.ALL);

	useEffect(() => {
		console.log({ defaultHabitSelection });
	}, [defaultHabitSelection]);

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

					<Title.Menu.SubsectionHeader>Visibility</Title.Menu.SubsectionHeader>
					<Label.Settings.WithToggle as="span" role="checkbox">
						<span>Default habit filter</span>
						<SettingsRadioGroup
							value={defaultHabitSelection}
							onChange={(value) =>
								setDefaultHabitSelection(value as HabitFilter)
							}
							data={[
								{
									label: "Show all habits",
									Icon: LucideCircleDot,
									value: HABIT_FILTER.ALL,
								},
								{
									label: "Hide habits if completed today",
									Icon: LucideCheck,
									value: HABIT_FILTER.TODAY,
								},
								{
									label: "Hide habits if completed in their interval",
									Icon: LucideCheckCheck,
									value: HABIT_FILTER.INTERVAL,
								},
							]}
						/>
					</Label.Settings.WithToggle>
				</S.SettingsGrid>

				<Buttons.Action.MinimalPlus
					type="button"
					onClick={() => logout()}
					style={{ marginTop: spacingValue.medium, alignSelf: "flex-end" }}
				>
					Log out
				</Buttons.Action.MinimalPlus>
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
