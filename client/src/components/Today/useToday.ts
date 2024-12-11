import { activityFallsOnDay, isAllDayActivityOnDate } from "@/lib/activity";
import { today } from "@/lib/datetime/make-date";
import useQueryActivities from "@/lib/hooks/query/activities/useQueryActivities";
import useHabitsData from "@/lib/hooks/useHabitsData";
import { selectedTimeWindowState } from "@/lib/state/selected-time-window-state";
import type { Dayjs } from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState } from "recoil";

/** Functionality hook for the Today component. */
export default function useToday() {
	const { data: activitiesData } = useQueryActivities();
	const { getHabitsForTimeWindow } = useHabitsData();
	const [currentDate, setCurrentDate] = useState<Dayjs>(() => today());
	const [timeWindow, setTimeWindow] = useRecoilState(selectedTimeWindowState);
	const changeDayTimeout = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		return () => {
			if (changeDayTimeout.current) {
				clearTimeout(changeDayTimeout.current);
			}
		};
	}, []);

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
		changeDayTimeout.current = setTimeout(() => {
			setCurrentDate((current) => current.add(direction === "next" ? 1 : -1, "day"));
		}, 25);
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

	// eslint-disable-next-line react-compiler/react-compiler
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
