import { activityModalId } from "@/components/Today/DetailedActivity.tsx";
import { useModalState } from "@/lib/state/modal-state.ts";
import { activityDuration, activityStart } from "@lib/activity.ts";
import type { ActivityWithIds } from "@type/server/activity.types.ts";
import type { ID } from "@type/server/utility.types.ts";
import * as S from "./Today.style.ts";

type ActivityProps = {
	activity: ActivityWithIds;
	indentation: Map<ID, number>;
};

export default function Activity({ activity, indentation }: ActivityProps) {
	const durationHours = activityDuration(activity);
	const offset = activityStart(activity).minute() / 60;
	const level = indentation.get(activity.activity_id) ?? 0;
	const { setModalState } = useModalState(activityModalId);

	return (
		<S.ActivityCard
			key={activity.activity_id}
			$level={level}
			$offset={offset}
			onClick={(e) => {
				setModalState(() => ({
					isOpen: true,
					itemId: activity.activity_id,
					itemType: "activity"
				}));
				e.stopPropagation();
			}}
		>
			<S.Activity $durationHours={durationHours}>
				<S.ActivityName>{activity.name}</S.ActivityName>
			</S.Activity>
		</S.ActivityCard>
	);
}
