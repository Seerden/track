import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import AllDayActivity from "@/components/Today/AllDayActivity";
import S from "./style/Today.style";

type AllDayActivitiesProps = {
	activities: PossiblySyntheticActivity[];
	// TODO: this could include synthetics, too, I guess, but I feel like that
	// would clog the list, so if we did include them, maybe as a separate thing
	// (like "yoga session: overdue 5 times")
};

export default function AllDayActivities({
	activities,
}: AllDayActivitiesProps) {
	return (
		/* TODO: rename AllDayActivityList to Container or something */
		<S.AllDayActivityList>
			{activities.map((activity) => (
				<AllDayActivity activity={activity} key={activity.activity_id} />
			))}
		</S.AllDayActivityList>
	);
}
