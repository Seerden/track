import AllDayActivity from "@/components/Today/AllDayActivity";
import DetailedActivity from "@/components/Today/DetailedActivity";
import { today } from "@/lib/datetime/make-date";
import modalIds from "@/lib/modal-ids";
import useActivitiesQuery from "@/lib/query/use-activities-query";
import { useModalState } from "@/lib/state/modal-state";
import {
	activityFallsOnDay,
	activityStartHour,
	assignIndentationLevelToActivities,
	isAllDayActivityOnDate
} from "@lib/activity";
import { useMemo } from "react";
import Notes from "./Notes";
import Row from "./Row";
import T from "./style/AllDayActivity.style";
import S from "./style/Today.style";
import Tasks from "./Tasks";

function useToday() {
	const { data: activitiesData } = useActivitiesQuery();
	const activities = useMemo(() => {
		return Object.values(activitiesData?.activitiesById ?? {}); // TODO: should this not be in a useActivities hook or someting?
	}, [activitiesData]);

	const currentDate = today();

	const todayActivities = activities.filter((activity) => {
		return activityFallsOnDay(activity, currentDate);
	});

	const allDayActivities = activities.filter((activity) =>
		isAllDayActivityOnDate(activity, currentDate)
	);

	const timestampedActivities = activities.filter(
		(activity) => !isAllDayActivityOnDate(activity, currentDate)
	);
	const indentation = assignIndentationLevelToActivities(
		timestampedActivities,
		currentDate
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
		indentation,
		currentDate,
		shouldShowDetailedActivity,
		selectedActivity
	};
}

export default function Today() {
	const {
		activities,
		allDayActivities,
		timestampedActivities,
		indentation,
		currentDate,
		selectedActivity,
		shouldShowDetailedActivity
	} = useToday();

	return (
		<S.Wrapper>
			<S.Header>
				<h1>{currentDate.format("dddd (DD MMMM)")}</h1>
			</S.Header>
			<S.Columns>
				<S.TimelineWrapper>
					<T.AllDayActivityList>
						{allDayActivities.map((activity) => (
							<AllDayActivity activity={activity} key={activity.activity_id} />
						))}
					</T.AllDayActivityList>

					<S.Rows>
						{Array.from(
							{ length: 24 }, // render a row for every hour of the day
							(_, i) => (
								<Row
									key={i}
									index={i}
									activities={timestampedActivities.filter(
										(a) => activityStartHour(a, currentDate) === i
									)}
									indentation={indentation}
								/>
							)
						)}
					</S.Rows>
				</S.TimelineWrapper>

				<Tasks activities={activities.filter((a) => a.is_task)} />

				<Notes />
			</S.Columns>
			{shouldShowDetailedActivity && selectedActivity && (
				<DetailedActivity activity={selectedActivity} />
			)}
		</S.Wrapper>
	);
}
