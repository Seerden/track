import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import type { Dayjs } from "dayjs";
import { LucideRepeat } from "lucide-react";
import { colors } from "@/lib/theme/colors";
import { Icon } from "@/lib/theme/components/icons";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import S, { activityMotionVariants } from "./style/Activity.style";
import { useActivity } from "./useActivity";

export default function Activity({
	activity,
	level,
	date,
}: {
	activity: PossiblySyntheticActivity;
	level: number;
	date: Dayjs;
}) {
	const { offset, openDetailedItemModal, durationHoursOnDate, recurrence } =
		useActivity(activity, date);

	return (
		<S.ActivityCard
			layout
			style={{
				zIndex: 100,
				transformOrigin: "left center",
			}}
			variants={activityMotionVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			$level={level}
			$offset={offset}
			onClick={(e) => {
				e.stopPropagation();
				openDetailedItemModal(activity.activity_id ?? activity.synthetic_id);
			}}
			transition={{ duration: 0.075, delay: 0, ease: "easeOut" }}
		>
			{/* TODO: on mouseover, display a short humanized time string */}
			<S.Activity
				$isTask={activity.is_task}
				$isRecurring={!!activity.recurrence_id || !!activity.will_recur}
				$durationHours={durationHoursOnDate}
				$completed={activity.completed ?? false}
			>
				<S.ActivityName>{activity.name}</S.ActivityName>

				{!!recurrence && <RepeatIcon />}
			</S.Activity>
		</S.ActivityCard>
	);
}

const icon = {
	size: "12",
	padding: spacingValue.smallest,
};

function RepeatIcon() {
	return (
		<div
			style={{
				position: "absolute",
				right: `calc(${spacingValue.smaller})`,
				top: `calc(50% - ${icon.size} / 2 - ${icon.padding} / 2)`,
			}}
		>
			<Icon
				style={{
					backgroundColor: colors.light[0],
					padding: icon.padding,
				}}
			>
				<LucideRepeat size={icon.size} />
			</Icon>
		</div>
	);
}
