import { useDisclosure } from "@mantine/hooks";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import { LucideCheck, LucideCircleDot } from "lucide-react";
import { type ChangeEvent, useEffect, useState } from "react";
import BlockHeader, {
	type RadioGroupOption,
} from "@/components/Today/BlockHeader";
import Empty from "@/components/Today/Empty";
import {
	activityEnd,
	activityStart,
	sortActivitiesByTime,
} from "@/lib/activity";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import T from "./style/Tasks.style";
import Task from "./Task";

type TasksProps = {
	activities: PossiblySyntheticActivity[];
};

function getActivityKey(activity: PossiblySyntheticActivity) {
	return `
      ${activityStart(activity).valueOf()}-${activityEnd(activity).valueOf()}-${activity.name}
   `;
}

const radioOptions: RadioGroupOption[] = [
	{
		tooltipLabel: "Show all tasks",
		Icon: LucideCircleDot,
		value: "all",
	},
	{
		tooltipLabel: "Hide completed tasks",
		Icon: LucideCheck,
		value: "completed",
	},
];

export default function Tasks({ activities }: TasksProps) {
	const { openModal } = useModalState();

	const sortedActivities = sortActivitiesByTime(activities);

	// TODO: atom?
	const [nameFilter, setNameFilter] = useState("");
	function handleNameFilterChange(e: ChangeEvent<HTMLInputElement>) {
		setNameFilter(e.target.value);
	}
	const [opened, { close, toggle }] = useDisclosure();
	// TODO: atom, so we can filter tasks by it in useToday or wherever
	const [taskFilter, setTaskFilter] = useState<"all" | "completed">("all");

	useEffect(() => {
		console.log({ taskFilter });
	}, [taskFilter]);

	return (
		<T.TasksWrapper>
			<BlockHeader
				checked={(value) => taskFilter === value}
				onPopoverClose={close}
				onRadioValueChange={(value) =>
					setTaskFilter(value as typeof taskFilter)
				}
				labelOn={taskFilter !== "all" || !!nameFilter.length}
				onSearchValueChange={handleNameFilterChange}
				popoverOpened={opened}
				radioGroupLabel="Task filter"
				radioOptions={radioOptions}
				radioValue={taskFilter}
				searchValue={nameFilter}
				title="Tasks"
				togglePopover={toggle}
				triggerAriaLabel="Toggle task filter"
				triggerTooltipOff="Showing all tasks"
				triggerTooltipOn="Filter applied to tasks"
			/>
			{activities.length ? (
				<T.Tasks>
					{sortedActivities.map((a) => (
						<Task key={getActivityKey(a)} activity={a} />
					))}
				</T.Tasks>
			) : (
				<Empty action={() => openModal(modalIds.activities.newTask)}>
					No tasks found for today.
				</Empty>
			)}
		</T.TasksWrapper>
	);
}
