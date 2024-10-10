import { activityDuration, activityStart } from "@lib/activity.ts";
import { ActivityWithIds } from "@type/server/activity.types.ts";
import { ID } from "@type/server/utility.types.ts";
import * as S from "./Today.style.ts";

type ActivityProps = {
	activity: ActivityWithIds;
	indentation: Map<ID, number>;
};

export default function Activity({ activity, indentation }: ActivityProps) {
	const durationHours = activityDuration(activity);
	const offset = activityStart(activity).minute() / 60;
	const level = indentation.get(activity.activity_id) ?? 0;

	return (
		<S.ActivityCard key={activity.activity_id} $level={level} $offset={offset}>
			<S.Activity $durationHours={durationHours}>
				<S.ActivityName>{activity.name}</S.ActivityName>
			</S.Activity>
		</S.ActivityCard>
	);
}
