import { Icon } from "@/lib/theme/components/icons";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import type { Dayjs } from "dayjs";
import { LucideRepeat } from "lucide-react";
import T from "./style/Activity.style";
import { useActivity } from "./useActivity";

export default function Activity({
	activity,
	level,
	date
}: {
	activity: PossiblySyntheticActivity;
	level: number;
	date: Dayjs;
}) {
	const { offset, openDetailedItemModal, durationHoursOnDate, recurrence } = useActivity(
		activity,
		date
	);

	return (
		<T.ActivityCard
			key={activity.activity_id}
			$level={level}
			$offset={offset}
			onClick={(e) => {
				e.stopPropagation();
				openDetailedItemModal(activity.activity_id ?? activity.synthetic_id);
			}}
		>
			{/* TODO: on mouseover, display a short humanized time string */}
			<T.Activity
				$isTask={activity.is_task}
				$isRecurring={!!activity.recurrence_id || !!activity.will_recur}
				$durationHours={durationHoursOnDate}
				$completed={activity.completed ?? false}
			>
				<T.ActivityName>{activity.name}</T.ActivityName>

				{!!recurrence && <RepeatIcon />}
			</T.Activity>
		</T.ActivityCard>
	);
}

const icon = {
	size: "12",
	padding: spacingValue.smallest
};

function RepeatIcon() {
	return (
		<div
			style={{
				position: "absolute",
				right: `calc(${spacingValue.smaller})`,
				top: `calc(50% - ${icon.size} / 2 - ${icon.padding} / 2)`
			}}
		>
			<Icon
				style={{
					backgroundColor: "white",
					padding: icon.padding
				}}
			>
				<LucideRepeat size={icon.size} />
			</Icon>
		</div>
	);
}
