import Calendar from "@/components/Calendar/Calendar";
import Modal from "@/components/Modal";
import NewActivity from "@/components/NewActivity/NewActivity";
import AllDayActivities from "@/components/Today/AllDayActivities";
import ChangeDayButton from "@/components/Today/ChangeDayButton";
import DetailedActivity from "@/components/Today/DetailedActivity";
import { activeItemState } from "@/components/Today/hooks/useDetailedActivityModal";
import TimelineRows from "@/components/Today/TimelineRows";
import { today } from "@/lib/datetime/make-date";
import modalIds from "@/lib/modal-ids";
import useActivitiesQuery from "@/lib/query/useActivitiesQuery";
import { useModalState } from "@/lib/state/modal-state";
import { activityFallsOnDay, isAllDayActivityOnDate } from "@lib/activity";
import type { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import Notes from "./Notes";
import S from "./style/Today.style";
import Tasks from "./Tasks";

/** Functionality hook for the Today component. */
function useToday() {
	const { data: activitiesData } = useActivitiesQuery();

	const [currentDate, setCurrentDate] = useState<Dayjs>(() => today());

	function changeDay(direction: "next" | "previous") {
		setCurrentDate((current) => current.add(direction === "next" ? 1 : -1, "day"));
	}

	const activities = useMemo(() => {
		return Object.values(activitiesData?.byId ?? {}); // TODO: should this not be in a useActivities hook or someting?
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

	const { modalIds: openModalIds } = useModalState();

	const shouldShowDetailedActivity = !!openModalIds.includes(modalIds.detailedActivity);

	const activeItemId = useRecoilValue(activeItemState);
	const selectedActivity = activities.find((a) => a.activity_id === activeItemId);

	const currentYear = today().year(); // TODO: edge case: make this reactive so it updates on New Year's
	const title = currentDate.format(
		`dddd (D MMMM${currentDate.year() !== currentYear ? " YYYY" : ""})`
	);

	return {
		activities: todayActivities,
		allDayActivities,
		timestampedActivities,
		currentDate,
		setCurrentDate,
		shouldShowDetailedActivity,
		selectedActivity,
		title,
		changeDay
	} as const;
}

export default function Today() {
	const t = useToday();
	const { openModal } = useModalState();

	return (
		<S.Wrapper>
			{/* TODO: we want the header to be aligned above the Timeline */}
			<S.Columns>
				<Calendar initialDate={t.currentDate} onChange={t.setCurrentDate} />
				<S.TimelineWrapper>
					<S.Header>
						<h1>
							<ChangeDayButton
								type="previous"
								onClick={() => t.changeDay("previous")}
							/>
							{t.title}
							<ChangeDayButton type="next" onClick={() => t.changeDay("next")} />
						</h1>
					</S.Header>
					{!!t.allDayActivities.length && (
						<AllDayActivities activities={t.allDayActivities} />
					)}
					<TimelineRows
						activities={t.timestampedActivities}
						currentDate={t.currentDate}
					/>
					<div>
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								openModal(modalIds.activities.new);
							}}
						>
							New activity
						</button>
					</div>
					<Modal initialOpen={false} modalId={modalIds.activities.new}>
						<NewActivity modalId={modalIds.activities.new} />
					</Modal>
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
