import { useTheme } from "@emotion/react";
import {
	Radio,
	type RadioCardProps,
	RadioIndicator,
	Tooltip,
} from "@mantine/core";
import { useAtomValue } from "jotai";
import type { LucideIcon } from "lucide-react";
import { habitFilterAtom } from "@/components/Today/habits/useHabits";
import type { MainTheme } from "@/lib/style/theme";
import { colors } from "@/lib/theme/colors";

export default function RadioOption(
	props: RadioCardProps & { Icon: LucideIcon; tooltipLabel: string }
) {
	const theme = useTheme() as MainTheme;
	const habitFilter = useAtomValue(habitFilterAtom);
	const isChecked = habitFilter === props.value;

	return (
		<Tooltip
			label={props.tooltipLabel}
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
				<props.Icon
					size={16}
					color={isChecked ? colors.dark[0] : "currentColor"}
				/>
			</Radio.Card>
		</Tooltip>
	);
}
