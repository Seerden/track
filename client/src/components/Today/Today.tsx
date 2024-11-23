import ActivityForm from "@/components/activities/ActivityForm/ActivityForm";
import Habits from "@/components/habits/Habits/Habits";
import NewHabit from "@/components/habits/NewHabit/NewHabit";
import NewNote from "@/components/notes/NewNote/NewNote";
import AllDayActivities from "@/components/Today/AllDayActivities";
import ChangeDayButton from "@/components/Today/ChangeDayButton";
import TimelineRows from "@/components/Today/TimelineRows";
import Calendar from "@/components/utility/Calendar/Calendar";
import Modal from "@/components/utility/Modal/Modal";
import SpeedDial from "@/components/utility/SpeedDial/SpeedDial";
import { today } from "@/lib/datetime/make-date";
import useActivitiesQuery from "@/lib/hooks/query/activities/useActivitiesQuery";
import useHabitsData from "@/lib/hooks/useHabitsData";
import type { ModalId } from "@/lib/modal-ids";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { selectedTimeWindowState } from "@/lib/state/selected-time-window-state";
import { activityFallsOnDay, isAllDayActivityOnDate } from "@lib/activity";
import type { Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import Notes from "./Notes";
import S from "./style/Today.style";
import Tasks from "./Tasks";

/** Functionality hook for the Today component. */
function useToday() {
	const { data: activitiesData } = useActivitiesQuery();
	const { getHabitsForTimeWindow } = useHabitsData();
	const [currentDate, setCurrentDate] = useState<Dayjs>(() => today());
	const [timeWindow, setTimeWindow] = useRecoilState(selectedTimeWindowState);

	useEffect(() => {
		if (currentDate) {
			setTimeWindow({
				startDate: currentDate.startOf("day"),
				endDate: currentDate.endOf("day"),
				intervalUnit: "day"
			});
		}
	}, [currentDate]);

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

	const currentYear = today().year(); // TODO: edge case: make this reactive so it updates on New Year's
	const title = currentDate.format(
		`dddd (D MMMM${currentDate.year() !== currentYear ? " YYYY" : ""})`
	);

	return {
		habits: getHabitsForTimeWindow(timeWindow),
		activities: todayActivities,
		allDayActivities,
		timestampedActivities,
		currentDate,
		setCurrentDate,
		title,
		changeDay
	} as const;
}

export default function Today() {
	const t = useToday();
	const { openModal } = useModalState();

	const [open, setOpen] = useState(false);

	function handleModalOpen(e: React.MouseEvent<HTMLButtonElement>, modalId: ModalId) {
		e.stopPropagation();
		openModal(modalId);
	}

	return (
		<S.Wrapper>
			{/* TODO: we want the header to be aligned above the Timeline */}
			<S.Columns>
				<div>
					<Calendar initialDate={t.currentDate} onChange={t.setCurrentDate} />

					<S.Create>
						<SpeedDial open={open} setOpen={setOpen}>
							<S.SpeedDialActions>
								<S.SpeedDialButton
									onClick={(e) => handleModalOpen(e, modalIds.activities.form)}
								>
									activity
								</S.SpeedDialButton>
								<S.SpeedDialButton
									onClick={(e) =>
										handleModalOpen(e, modalIds.activities.newTask)
									}
								>
									task
								</S.SpeedDialButton>
								<S.SpeedDialButton
									onClick={(e) => handleModalOpen(e, modalIds.habits.new)}
								>
									habit
								</S.SpeedDialButton>
								<S.SpeedDialButton
									onClick={(e) => handleModalOpen(e, modalIds.notes.new)}
								>
									note
								</S.SpeedDialButton>
							</S.SpeedDialActions>
						</SpeedDial>
					</S.Create>
				</div>
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

					{!!t.habits && (
						<S.Habits>
							<Habits habits={t.habits} />
						</S.Habits>
					)}

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

			<Modal initialOpen={false} modalId={modalIds.activities.form}>
				<ActivityForm modalId={modalIds.activities.form} />
			</Modal>

			<Modal initialOpen={false} modalId={modalIds.activities.newTask}>
				<ActivityForm isTask modalId={modalIds.activities.newTask} />
			</Modal>

			<Modal initialOpen={false} modalId={modalIds.habits.new}>
				<NewHabit />
			</Modal>

			<Modal initialOpen={false} modalId={modalIds.notes.new}>
				<NewNote />
			</Modal>
		</S.Wrapper>
	);
}
