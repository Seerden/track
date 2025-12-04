import { useDisclosure } from "@mantine/hooks";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import { useAtom } from "jotai";
import { type ChangeEvent, useState } from "react";
import {
	TASK_FILTER,
	taskFilterRadioOptions,
	tasksFilterAtom,
} from "@/components/Today/tasks/task-filter";
import { sortActivitiesByTime } from "@/lib/activity";

export function useTasks(activities: PossiblySyntheticActivity[]) {
	const [taskFilter, setTaskFilter] = useAtom(tasksFilterAtom);
	const [nameFilter, setNameFilter] = useState(""); // TODO: atom?
	const [opened, { toggle }] = useDisclosure();

	const sortedActivities = sortActivitiesByTime(activities);

	const filteredActivities = sortedActivities.filter((activity) => {
		if (taskFilter === "completed" && activity.completed) return false;
		if (!nameFilter?.length) return true;
		return activity.name.toLowerCase().includes(nameFilter.toLowerCase());
	});

	function handleNameFilterChange(e: ChangeEvent<HTMLInputElement>) {
		setNameFilter(e.target.value);
	}

	const headerProps = {
		checked: (value: string | undefined) => taskFilter === value,
		onRadioValueChange: (value: string) =>
			setTaskFilter(value as typeof taskFilter),
		labelOn: taskFilter !== TASK_FILTER.ALL || !!nameFilter.length,
		onSearchValueChange: handleNameFilterChange,
		popoverOpened: opened,
		radioGroupLabel: "Task filter",
		radioOptions: taskFilterRadioOptions,
		radioValue: taskFilter,
		searchValue: nameFilter,
		title: "Tasks",
		togglePopover: toggle,
		triggerAriaLabel: "Toggle task filter",
		triggerTooltipOff: "Showing all tasks",
		triggerTooltipOn: "Filter applied to tasks",
	};

	return {
		filteredActivities,
		headerProps,
	};
}
