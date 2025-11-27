import { useAtomValue } from "jotai";
import { LucideToggleLeft, LucideToggleRight } from "lucide-react";
import {
	habitFilterAtom,
	habitSelectionRadioOptions,
} from "@/components/Today/habits/habit-filter";
import {
	taskFilterRadioOptions,
	tasksFilterAtom,
} from "@/components/Today/tasks/task-filter";
import SettingsRadioGroup from "@/components/user/profile/settings/SettingsRadioGroup";
import { useSettings } from "@/components/user/profile/settings/useSettings";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import useAuthentication from "@/lib/hooks/useAuthentication";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import { Label } from "@/lib/theme/components/form/label.style";
import { Title } from "@/lib/theme/components/text/title.style";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import S from "./style/Settings.style";

export default function Settings() {
	const { logout } = useAuthentication();
	const { handlers, disableNotifications, settings } = useSettings();
	const habitFilter = useAtomValue(habitFilterAtom);
	const taskFilter = useAtomValue(tasksFilterAtom);

	return (
		<Containers.Column gap={"small"} style={{ padding: spacingValue.medium }}>
			<Title.Menu.SectionHeader>Settings</Title.Menu.SectionHeader>
			<S.SettingsGrid>
				<Title.Menu.SubsectionHeader>Notifications</Title.Menu.SubsectionHeader>
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
						label="Habit filter selection"
						value={settings?.default_habit_completion_filter ?? habitFilter}
						onChange={handlers.updateHabitFilter}
						data={habitSelectionRadioOptions}
					/>
				</Label.Settings.WithToggle>

				<Label.Settings.WithToggle as="span" role="checkbox">
					<span>Default task filter</span>
					<SettingsRadioGroup
						label="Task filter selection"
						value={settings?.default_task_completion_filter ?? taskFilter}
						onChange={handlers.updateTaskFilter}
						data={taskFilterRadioOptions}
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
	);
}
