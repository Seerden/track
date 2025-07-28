import AllDayActivity from "@/components/Today/AllDayActivity";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import S from "./style/Today.style";

type AllDayActivitiesProps = {
	activities: PossiblySyntheticActivity[];
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
