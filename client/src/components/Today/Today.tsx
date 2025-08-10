import ActivityForm from "@/components/activities/ActivityForm/ActivityForm";
import NewHabit from "@/components/habits/NewHabit/NewHabit";
import NewNote from "@/components/notes/NewNote/NewNote";
import AllDayActivities from "@/components/Today/AllDayActivities";
import Create from "@/components/Today/Create";
import Habits from "@/components/Today/Habits";
import TimelineRows from "@/components/Today/TimelineRows";
import useToday from "@/components/Today/useToday";
import Calendar from "@/components/utility/Calendar/Calendar";
import Modal from "@/components/utility/Modal/Modal";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { colors } from "@/lib/theme/colors";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import Icons from "@/lib/theme/components/icons";
import { Tooltip } from "@mantine/core";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import { LucideClockAlert } from "lucide-react";
import Notes from "./Notes";
import S from "./style/Today.style";
import Tasks from "./Tasks";

function OverdueTasksIndicator({
	overdueTasks
}: {
	overdueTasks?: PossiblySyntheticActivity[];
}) {
	const { openModal } = useModalState();

	return (
		<Buttons.Unstyled
			onClick={() => openModal(modalIds.activities.tasks.overdue)}
			style={{
				position: "absolute",
				right: "1rem",
				top: "15px" // size is 30px, so this centers it vertically
			}}
		>
			<Tooltip
				label={`You have ${overdueTasks?.length} overdue tasks`}
				position="top"
				withArrow
			>
				<Icons.InBadge $color={colors.orange.secondary} invert size={"30px"}>
					<LucideClockAlert strokeWidth={2} size={22} />
				</Icons.InBadge>
			</Tooltip>
		</Buttons.Unstyled>
	);
}

export default function Today() {
	const {
		activities,
		allDayActivities,
		overdueTasks,
		currentDate,
		habitsById,
		timestampedActivities,
		title,
		changeDay,
		setCurrentDate
	} = useToday();

	return (
		<>
			<S.Columns>
				<div style={{ gridArea: "calendar" }}>
					<Calendar initialDate={currentDate} onChange={setCurrentDate} />
				</div>

				<Create />

				<S.TimelineWrapper style={{ gridArea: "timeline" }}>
					<S.Header style={{ gridArea: "header" }}>
						<h1>
							<Containers.Row gap="small">
								<Buttons.Action.Direction
									direction="previous"
									onClick={() => changeDay("previous")}
								/>
								<Buttons.Action.Direction
									direction="next"
									onClick={() => changeDay("next")}
								/>
							</Containers.Row>
							{title}
						</h1>
						<OverdueTasksIndicator overdueTasks={overdueTasks} />
					</S.Header>
					{(!!allDayActivities.length || !!overdueTasks?.length) && (
						// TODO: rename AllDayActivities to PinnedActivities or
						// similar. Change the condition above to include the case
						// where there are overdue tasks.
						<AllDayActivities
							activities={allDayActivities}
							overdueTasks={overdueTasks}
						/>
					)}

					<TimelineRows
						activities={timestampedActivities}
						currentDate={currentDate}
					/>
				</S.TimelineWrapper>

				{/* TODO: at small viewports, put these in a modal or something. Do not always render the list. 
               Keeps the page more compact: I'd prefer not having to scroll to see these things, but they 
               don't fit in the viewport with the timeline, so either they need to be more compact somehow,
               or the timeline needs to shrink, or we do something like a modal. */}
				<Containers.Column
					padding="medium"
					gap="medium"
					style={{ gridArea: "things" }}
				>
					<Habits habitsById={habitsById} />
					<Tasks activities={activities.filter((a) => a.is_task)} />
					<Notes />
				</Containers.Column>
			</S.Columns>

			{/* TODO: see modal rework issue (TRK-211) */}
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
