import { useTheme } from "@emotion/react";
import {
	Radio,
	type RadioCardProps,
	RadioIndicator,
	Tooltip,
} from "@mantine/core";
import type { LucideIcon } from "lucide-react";
import type { MainTheme } from "@/lib/style/theme";
import { colors } from "@/lib/theme/colors";
import { spacingValue } from "@/lib/theme/snippets/spacing";

type RadioOptionProps = RadioCardProps & {
	Icon: LucideIcon;
	tooltipLabel: string;
};

/** Small generalization of RadioCard for specific use cases.
 * @usage use this in a user setting that has multiple options (like the habit
 *    completion filter preference).
 * @usage use this in the filters for habits and tasks for completion state.
 */
export default function RadioOption({
	Icon,
	tooltipLabel,
	checked,
	...props
}: RadioOptionProps) {
	const theme = useTheme() as MainTheme;

	return (
		<Tooltip
			label={tooltipLabel}
			events={{ hover: true, focus: true, touch: true }}
		>
			<Radio.Card
				{...props}
				checked={checked}
				styles={{
					card: {
						borderRadius: "50%",
						display: "flex",
						width: "max-content",
						alignItems: "center",
						color: theme.colors.text.main[0],
						padding: spacingValue.smaller,
						backgroundColor: checked ? colors.green.secondary : "var(--bg-1-2)",
					},
				}}
			>
				<RadioIndicator hidden />
				<Icon size={16} color={checked ? colors.dark[0] : "currentColor"} />
			</Radio.Card>
		</Tooltip>
	);
}
