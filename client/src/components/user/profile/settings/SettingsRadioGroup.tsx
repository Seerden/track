import { useTheme } from "@emotion/react";
import {
	Radio,
	type RadioCardProps,
	RadioIndicator,
	Tooltip,
} from "@mantine/core";
import type { LucideIcon } from "lucide-react";
import {
	HABIT_FILTER,
	type HabitFilter,
} from "@/components/Today/habits/useHabits";
import type { MainTheme } from "@/lib/style/theme";
import { colors } from "@/lib/theme/colors";
import Containers from "@/lib/theme/components/container.style";

function RadioOption({
	Icon,
	tooltipLabel,
	isChecked,
	...props
}: RadioCardProps & {
	Icon: LucideIcon;
	tooltipLabel: string;
	isChecked?: boolean;
}) {
	const theme = useTheme() as MainTheme;

	return (
		<Tooltip
			label={tooltipLabel}
			events={{ hover: true, focus: true, touch: true }}
		>
			<Radio.Card
				{...props}
				styles={{
					card: {
						borderRadius: "50%",
						display: "flex",
						width: "max-content",
						color: theme.colors.text.main[0],
						padding: "0.3rem",
						alignItems: "center",
						backgroundColor: isChecked
							? colors.green.secondary
							: "var(--bg-1-2)",
					},
				}}
			>
				<RadioIndicator hidden />
				<Icon size={16} color={isChecked ? colors.dark[0] : "currentColor"} />
			</Radio.Card>
		</Tooltip>
	);
}

export default function SettingsRadioGroup({
	data,
	value,
	onChange,
}: {
	onChange: (value: string) => void;
	value: HabitFilter;
	data: Array<{
		label: string;
		Icon: LucideIcon;
		value: string;
		checked?: boolean;
	}>;
}) {
	return (
		<Radio.Group
			aria-label="Habit filter"
			onChange={(value) => {
				console.log({ value, a: 1 });
				onChange(value);
			}}
			value={HABIT_FILTER.ALL}
		>
			<Containers.Row gap="small">
				{data.map((radioOption) => (
					<RadioOption
						value={radioOption.value}
						isChecked={value === radioOption.value}
						key={radioOption.label}
						tooltipLabel={radioOption.label}
						Icon={radioOption.Icon}
					/>
				))}
			</Containers.Row>
		</Radio.Group>
	);
}
