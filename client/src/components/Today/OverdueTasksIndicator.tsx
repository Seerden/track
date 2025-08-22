import { Tooltip } from "@mantine/core";
import { LucideClockAlert } from "lucide-react";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { colors } from "@/lib/theme/colors";
import Buttons from "@/lib/theme/components/buttons";
import Icons from "@/lib/theme/components/icons";

export function OverdueTasksIndicator({
	taskCount,
	/** Button/icon size in pixels. */
	size = 30,
}: {
	taskCount: number;
	size?: number;
}) {
	const { openModal } = useModalState();

	if (taskCount === 0) {
		return null;
	}

	return (
		<Buttons.Unstyled
			onClick={() => openModal(modalIds.activities.tasks.overdue)}
			style={{
				position: "absolute",
				right: "1rem",
				top: `${Math.floor(size / 2)}px`,
			}}>
			<Tooltip
				label={`You have ${taskCount} overdue tasks`}
				position="top"
				withArrow>
				<Icons.InBadge
					$color={colors.red.secondary}
					invert
					size={`${Math.floor(size)}px`}>
					<LucideClockAlert strokeWidth={2} size={22} />
				</Icons.InBadge>
			</Tooltip>
		</Buttons.Unstyled>
	);
}
