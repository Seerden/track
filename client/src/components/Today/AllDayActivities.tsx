import AllDayActivity from "@/components/Today/AllDayActivity";
import type { ActivityWithIds } from "@shared/lib/schemas/activity";
import S from "./style/Today.style";

type AllDayActivitiesProps = {
	activities: ActivityWithIds[];
};

export default function AllDayActivities({ activities }: AllDayActivitiesProps) {
	return (
		<S.AllDayActivityList>
			{activities.map((activity) => (
				<AllDayActivity activity={activity} key={activity.activity_id} />
			))}
		</S.AllDayActivityList>
	);
}
