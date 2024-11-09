import Calendar from "@/components/Calendar/Calendar";
import AllDayActivities from "@/components/Today/AllDayActivities";
import DetailedActivity from "@/components/Today/DetailedActivity";
import TimelineRows from "@/components/Today/TimelineRows";
import { today } from "@/lib/datetime/make-date";
import modalIds from "@/lib/modal-ids";
import useActivitiesQuery from "@/lib/query/useActivitiesQuery";
import { useModalState } from "@/lib/state/modal-state";
import { activityFallsOnDay, isAllDayActivityOnDate } from "@lib/activity";
import type { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import Notes from "./Notes";
import S from "./style/Today.style";
import Tasks from "./Tasks";

/** Functionality hook for the Today component. */
function useToday() {
	const { data: activitiesData } = useActivitiesQuery();

	const [currentDate, setCurrentDate] = useState<Dayjs>(() => today());

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
		setCurrentDate,
		shouldShowDetailedActivity,
		selectedActivity
	} as const;
}

export default function Today() {
	const t = useToday();
	const currentYear = today().year(); // TODO: this will not be reactive, so will not automatically flip around midnight
	// TODO: this also is not reactive enough
	const title = t.currentDate.format(
		`dddd (D MMMM${t.currentDate.year() !== currentYear ? " YYYY" : ""})`
	);

	return (
		<S.Wrapper>
			{/* TODO: we want the header to be aligned above the Timeline */}
			<S.Columns>
				<Calendar initialDate={t.currentDate} onChange={t.setCurrentDate} />
				<S.TimelineWrapper>
					<S.Header>
						<h1>{title}</h1>
					</S.Header>
					{!!t.allDayActivities.length && (
						<AllDayActivities activities={t.allDayActivities} />
					)}
					<TimelineRows
						activities={t.timestampedActivities}
						currentDate={t.currentDate}
					/>
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
