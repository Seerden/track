import { byIdAsList } from "@shared/lib/map";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import { useQuery } from "@tanstack/react-query";
import type { Dayjs } from "dayjs";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { tagFilterAtom } from "@/components/activities/ActivityFilter/tag-filter.atom";
import { filterByTags } from "@/components/tags/TagFilter/filter-tags";
import {
	activityEnd,
	activityFallsOnDay,
	activityStart,
	isAllDayActivityOnDate,
} from "@/lib/activity";
import { today } from "@/lib/datetime/make-date";
import { useQueryActivities } from "@/lib/hooks/query/activities/useQueryActivities";
import useHabitsData from "@/lib/hooks/useHabitsData";
import { syntheticActivitiesAtom } from "@/lib/state/synthetic-activity-state";
import { timeWindowAtom } from "@/lib/state/time-window.state";
import { trpc } from "@/lib/trpc";

/** Functionality hook for the Today component. */
export default function useToday() {
	const { data: activitiesData, isFetching: isFetchingActivities } =
		useQueryActivities();
	const { data: recurrences, isFetching: isFetchingRecurrences } = useQuery(
		trpc.activities.recurrences.all.queryOptions()
	);
	const { habits } = useHabitsData();
	const { data: overdueTasksData, isFetching: isFetchingOverdueTasks } =
		useQuery(trpc.activities.tasks.overdue.queryOptions());

	const syntheticActivities = useAtomValue(syntheticActivitiesAtom);
	const tagFilter = useAtomValue(tagFilterAtom);
	const [currentDate, setCurrentDate] = useState<Dayjs>(() => today());
	const [timeWindow, setTimeWindow] = useAtom(timeWindowAtom);

	const isFetching =
		isFetchingActivities || isFetchingRecurrences || isFetchingOverdueTasks;

	useEffect(() => {
		if (currentDate) {
			setTimeWindow({
				startDate: currentDate.startOf("day"),
				endDate: currentDate.endOf("day"),
				intervalUnit: "day",
			});
		}
	}, [currentDate]);

	function changeDay(direction: "next" | "previous") {
		setCurrentDate((current) =>
			current.add(direction === "next" ? 1 : -1, "day")
		);
	}

	const activities = useMemo(() => {
		const activityList = byIdAsList(activitiesData);

		const allActivities: PossiblySyntheticActivity[] = activityList.concat(
			// @ts-expect-error: Concat is faster than destructuring both. We don't
			// care that concat expects the same type.
			syntheticActivities.filter((synthetic) => {
				// filter out the synthetic activities that correspond to real ones
				// (presumably from synthetics turned real in the past)
				return !activityList.some(
					(activity) =>
						activity.recurrence_id === synthetic.recurrence_id &&
						(activityStart(activity).isSame(activityStart(synthetic)) ||
							activityEnd(activity).isSame(activityEnd(synthetic)))
				);
			})
		);

		return filterByTags(allActivities, tagFilter);
	}, [activitiesData, timeWindow, recurrences, syntheticActivities, tagFilter]);

	// TODO: todayActivities, allDayActivities, timestampedActivities are all
	// memoized off the same variables, so we could combine them into a single
	// activities object that has all three properties.

	// TODO: render these separately from AllDayActivities, but in the same place
	// (above the timeline). Maybe as a badge + modal combination. Need to
	// display datetime or humanized date, since they're all in the past.
	const overdueTasks = useMemo(() => {
		if (!overdueTasksData) return [];

		return byIdAsList(overdueTasksData);
	}, [overdueTasksData]);

	const todayActivities = useMemo(() => {
		return activities.filter((activity) => {
			return activityFallsOnDay(activity, currentDate);
		});
	}, [activities, currentDate]);

	const allDayActivities = useMemo(() => {
		return activities.filter((activity) =>
			isAllDayActivityOnDate(activity, currentDate)
		);
	}, [activities, currentDate]);

	const timestampedActivities = useMemo(() => {
		return activities.filter(
			(activity) => !isAllDayActivityOnDate(activity, currentDate)
		);
	}, [activities, currentDate]);

	const currentYear = today().year(); // TODO: edge case: make this reactive so it updates on New Year's
	const title = currentDate.format(
		`dddd (D MMMM${currentDate.year() !== currentYear ? " YYYY" : ""})`
	);

	return {
		habits,
		activities: todayActivities,
		allDayActivities,
		overdueTasks,
		timestampedActivities,
		currentDate,
		setCurrentDate,
		title,
		changeDay,
		isFetching,
	} as const;
}
