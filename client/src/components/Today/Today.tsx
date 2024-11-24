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
import type { PropsWithChildren } from "react";
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

	const [speedDialOpen, setSpeedDialOpen] = useState(false);

	return {
		habits: getHabitsForTimeWindow(timeWindow),
		activities: todayActivities,
		allDayActivities,
		timestampedActivities,
		currentDate,
		setCurrentDate,
		title,
		changeDay,
		speedDialOpen,
		setSpeedDialOpen
	} as const;
}

type SpeedDialActionProps = {
	$color?: React.ComponentProps<typeof S.SpeedDialButton>["$color"];
	modalId: ModalId;
};

export default function Today() {
	const t = useToday();

	const { openModal } = useModalState();
	function handleModalOpen(e: React.MouseEvent<HTMLButtonElement>, modalId: ModalId) {
		e.stopPropagation();
		openModal(modalId);
	}

	function SpeedDialAction({
		children,
		$color = "blue",
		modalId
	}: PropsWithChildren<SpeedDialActionProps>) {
		return (
			<S.SpeedDialButton $color={$color} onClick={(e) => handleModalOpen(e, modalId)}>
				{children}
			</S.SpeedDialButton>
		);
	}

	return (
		<>
			{/* TODO: we want the header to be aligned above the Timeline */}
			<S.Columns>
				<div
					style={{
						gridArea: "calendar"
					}}
				>
					<Calendar initialDate={t.currentDate} onChange={t.setCurrentDate} />
				</div>

				<S.Create>
					<SpeedDial open={t.speedDialOpen} setOpen={t.setSpeedDialOpen}>
						<S.SpeedDialActions>
							<SpeedDialAction modalId={modalIds.activities.form}>
								activity
							</SpeedDialAction>
							<SpeedDialAction modalId={modalIds.activities.newTask}>
								task
							</SpeedDialAction>
							<SpeedDialAction modalId={modalIds.habits.new}>
								habit
							</SpeedDialAction>
							<SpeedDialAction modalId={modalIds.notes.new}>note</SpeedDialAction>
						</S.SpeedDialActions>
					</SpeedDial>
				</S.Create>
				<S.TimelineWrapper
					style={{
						gridArea: "timeline"
					}}
				>
					<S.Header
						style={{
							gridArea: "header"
						}}
					>
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

					<div style={{ gridArea: "timeline" }}>
						<TimelineRows
							activities={t.timestampedActivities}
							currentDate={t.currentDate}
						/>
					</div>
				</S.TimelineWrapper>

				<S.Things>
					{!!t.habits && (
						<S.Habits style={{ gridArea: "habits" }}>
							<S.BlockTitle>Habits</S.BlockTitle>
							<Habits habits={t.habits} />
						</S.Habits>
					)}
					<div
						style={{
							gridArea: "tasks"
						}}
					>
						<Tasks activities={t.activities.filter((a) => a.is_task)} />
					</div>
					<div
						style={{
							gridArea: "notes"
						}}
					>
						<Notes />
					</div>
				</S.Things>
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
		</>
	);
}
