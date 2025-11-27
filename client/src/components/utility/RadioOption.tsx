import { useTheme } from "@emotion/react";
import {
	Radio,
	type RadioCardProps,
	RadioIndicator,
	Tooltip,
} from "@mantine/core";
import type { LucideIcon } from "lucide-react";
import type { MainTheme } from "@/lib/style/theme";
import {
	radioCardBackgroundColor,
	radioCardColor,
	radioCardStyles,
} from "@/lib/theme/components/form/radio.style";

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
	/** destructure these so we can pass them straight to Radio.Card */
	...radioCardProps
}: RadioOptionProps) {
	const theme = useTheme() as MainTheme;

	return (
		<Tooltip label={tooltipLabel}>
			<Radio.Card
				{...radioCardProps}
				checked={checked}
				styles={{
					card: {
						...radioCardStyles(theme),
						backgroundColor: radioCardBackgroundColor(checked),
					},
				}}
			>
				<RadioIndicator hidden />
				<Icon size={16} color={radioCardColor(checked)} />
			</Radio.Card>
		</Tooltip>
	);
}
