import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import type { Dayjs } from "dayjs";
import { LucideRepeat } from "lucide-react";
import { colors } from "@/lib/theme/colors";
import { Icon } from "@/lib/theme/components/icons";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import S from "./style/Activity.style";
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
				transformOrigin: "center",
				originX: "center",
				originY: "center",
				zIndex: 100,
			}}
			// initial={{
			// 	opacity: 0,
			// 	// scale: 0.95
			// }}
			// animate={{
			// 	opacity: 1,
			// 	// scale: 1,
			// 	transition: {
			// 		delay: 0.25,
			// 	},
			// }}
			// exit={{
			// 	// scale: 0.95,
			// 	transition: {
			// 		ease: "easeOut",
			// 		duration: 0.15,
			// 	},
			// }}
			// transition={{
			// 	duration: 0.15,
			// 	type: "tween",
			// }}
			$level={level}
			$offset={offset}
			onClick={(e) => {
				e.stopPropagation();
				openDetailedItemModal(activity.activity_id ?? activity.synthetic_id);
			}}
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
