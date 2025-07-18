import { activityFallsOnDay, isAllDayActivityOnDate } from "@/lib/activity";
import { formatDate } from "@/lib/datetime/format-date";
import { today } from "@/lib/datetime/make-date";
import useHabitsData from "@/lib/hooks/useHabitsData";
import { timeWindowAtom } from "@/lib/state/time-window.state";
import { trpc } from "@/lib/trpc";
import { byIdAsList } from "@shared/lib/map";
import { useQuery } from "@tanstack/react-query";
import type { Dayjs } from "dayjs";
import { useAtom } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";

/** Functionality hook for the Today component. */
export default function useToday() {
	const { data: activitiesData } = useQuery(trpc.activities.all.queryOptions());
	const { getHabitsForTimeWindow } = useHabitsData();
	const [currentDate, setCurrentDate] = useState<Dayjs>(() => today());
	const [timeWindow, setTimeWindow] = useAtom(timeWindowAtom);
	const changeDayTimeout = useRef<NodeJS.Timeout | null>(null);
	const currentDateString = useMemo(() => {
		return formatDate(currentDate);
	}, [currentDate]);

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

	// TODO: check if this needs to be a memo
	const activities = byIdAsList(activitiesData?.byId);
	const todayActivities = useMemo(() => {
		return activities.filter((activity) => {
			return activityFallsOnDay(activity, currentDate);
		});
	}, [activities, currentDateString]);
	const allDayActivities = useMemo(() => {
		return activities.filter((activity) =>
			isAllDayActivityOnDate(activity, currentDate)
		);
	}, [activities, currentDateString]);

	const timestampedActivities = useMemo(() => {
		return activities.filter(
			(activity) => !isAllDayActivityOnDate(activity, currentDate)
		);
	}, [activities, currentDateString]);

	const currentYear = today().year(); // TODO: edge case: make this reactive so it updates on New Year's
	const title = currentDate.format(
		`dddd (D MMMM${currentDate.year() !== currentYear ? " YYYY" : ""})`
	);

	return {
		habitsById: getHabitsForTimeWindow(timeWindow),
		activities: todayActivities,
		allDayActivities,
		timestampedActivities,
		currentDate,
		setCurrentDate,
		title,
		changeDay
	} as const;
}
