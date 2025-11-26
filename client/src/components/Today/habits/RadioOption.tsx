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

// TODO: move this to parent folder, since it's shared between all filters on
// the page
export default function RadioOption({
	Icon,
	tooltipLabel,
	checked,
	...props
}: RadioCardProps & { Icon: LucideIcon; tooltipLabel: string }) {
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
						color: theme.colors.text.main[0],
						padding: "0.3rem",
						alignItems: "center",
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
