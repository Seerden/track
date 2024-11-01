import AllDayActivity from "@/components/Today/AllDayActivity";
import DetailedActivity from "@/components/Today/DetailedActivity";
import Rows from "@/components/Today/Rows";
import { today } from "@/lib/datetime/make-date";
import modalIds from "@/lib/modal-ids";
import useActivitiesQuery from "@/lib/query/use-activities-query";
import { useModalState } from "@/lib/state/modal-state";
import { activityFallsOnDay, isAllDayActivityOnDate } from "@lib/activity";
import { useMemo } from "react";
import Notes from "./Notes";
import S from "./style/Today.style";
import Tasks from "./Tasks";

function useToday() {
	const { data: activitiesData } = useActivitiesQuery();

	const currentDate = today();

	const activities = useMemo(() => {
		return Object.values(activitiesData?.activitiesById ?? {}); // TODO: should this not be in a useActivities hook or someting?
	}, [activitiesData]);
	const todayActivities = activities.filter((activity) => {
		return activityFallsOnDay(activity, currentDate);
	});
	const allDayActivities = activities.filter((activity) =>
		isAllDayActivityOnDate(activity, currentDate)
	);
	const timestampedActivities = activities.filter(
		(activity) => !isAllDayActivityOnDate(activity, currentDate)
	);

	const { state } = useModalState(modalIds.detailedActivity);
	const shouldShowDetailedActivity = !!(
		state.isOpen &&
		state.itemType === "activity" &&
		state.itemId
	);

	const selectedActivity = activities.find((a) => a.activity_id === state.itemId);

	return {
		activities: todayActivities,
		allDayActivities,
		timestampedActivities,
		currentDate,
		shouldShowDetailedActivity,
		selectedActivity
	} as const;
}

export default function Today() {
	const t = useToday();

	return (
		<S.Wrapper>
			<S.Header>
				<h1>{t.currentDate.format("dddd (DD MMMM)")}</h1>
			</S.Header>
			<S.Columns>
				<S.TimelineWrapper>
					<S.AllDayActivityList>
						{t.allDayActivities.map((activity) => (
							<AllDayActivity activity={activity} key={activity.activity_id} />
						))}
					</S.AllDayActivityList>

					<Rows activities={t.timestampedActivities} currentDate={t.currentDate} />
				</S.TimelineWrapper>

				<Tasks activities={t.activities.filter((a) => a.is_task)} />

				<Notes />
			</S.Columns>
			{t.shouldShowDetailedActivity && t.selectedActivity && (
				<DetailedActivity activity={t.selectedActivity} />
			)}
		</S.Wrapper>
	);
}
