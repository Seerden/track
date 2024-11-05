import { useDetailedActivityModal } from "@/components/Today/hooks/useDetailedActivityModal.ts";
import { activityDuration, activityStart, activityStartHour } from "@/lib/activity.ts";
import usePutTaskCompletion from "@/lib/hooks/use-put-task-completion.ts";
import { Checkbox } from "@/lib/theme/components/Checkbox.tsx";
import type { ActivityWithIds } from "@type/server/activity.types.ts";
import T from "./style/Activity.style.ts";
import S from "./style/Today.style.ts";

function useActivity(activity: ActivityWithIds) {
	const offset = activityStart(activity).minute() / 60; // TODO: BUG: this takes the start on the first day, needs the start on the displayed day
	const { openDetailedActivityModal } = useDetailedActivityModal(activity);
	const putCompletion = usePutTaskCompletion(activity);

	/** This is the _displayed_ duration on the Today timeline. A multiday
	 * activity still "ends" at midnight on this view. TODO: maybe change this
	 * variable name to reflect this. */
	const durationHours = Math.min(
		// TODO: same as above, needs to be on the displayed day, not on the
		// activity's first day
		activityDuration(activity),
		24 - offset - activityStartHour(activity, activityStart(activity))
	);

	return {
		durationHours,
		offset,
		openDetailedActivityModal,
		putCompletion
	} as const;
}

export type ActivityProps = {
	activity: ActivityWithIds;
	level: number;
};

export default function Activity({ activity, level }: ActivityProps) {
	const { offset, openDetailedActivityModal, durationHours, putCompletion } =
		useActivity(activity);

	return (
		<T.ActivityCard
			key={activity.activity_id}
			$level={level}
			$offset={offset}
			onClick={(e) => {
				e.stopPropagation();
				openDetailedActivityModal();
			}}
		>
			{/* TODO: on mouseover, display a short humanized time string */}
			<T.Activity $durationHours={durationHours}>
				<T.ActivityName>{activity.name}</T.ActivityName>
				{activity.is_task && (
					// TODO: should really prioritize reworking checkboxes so we can
					// stop using this pattern
					<S.CheckboxWrapper
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							putCompletion();
						}}
					>
						<S.Checkbox
							type="checkbox"
							checked={activity.completed}
							style={{ display: "none" }}
						/>
						<Checkbox checked={activity.completed} />
					</S.CheckboxWrapper>
				)}
			</T.Activity>
		</T.ActivityCard>
	);
}
