import { css } from "@emotion/react";
import { Skeleton } from "@mantine/core";
import { Suspense } from "react";
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
import type { MainTheme } from "@/lib/style/theme";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import { DefaultSkeleton } from "../layout/Skeleton";
import Notes from "./Notes";
import { OverdueTasksIndicator } from "./OverdueTasksIndicator";
import { rowHeight } from "./style/TimelineRow.style";
import S from "./style/Today.style";
import Task from "./Task";
import Tasks from "./Tasks";

const overdueTasksColumnCss = (t: MainTheme) => css`
   padding-top: ${spacingValue.small};
   min-width: 500px;
   max-height: 50vh;
   overflow-y: auto;
   ${
			(t as MainTheme).mode === "dark" &&
			css`
            & > * {
            background-color: ${(t as MainTheme).colors.background.main[1]};
         `
		}
`;

export default function Today() {
	const {
		activities,
		allDayActivities,
		overdueTasks,
		currentDate,
		habits,
		timestampedActivities,
		title,
		changeDay,
		setCurrentDate,
		isFetching,
	} = useToday();

	return (
		<Suspense fallback={<DefaultSkeleton />}>
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
						<OverdueTasksIndicator taskCount={overdueTasks?.length ?? 0} />
					</S.Header>

					{!!allDayActivities.length && (
						// TODO: rename AllDayActivities to PinnedActivities or
						// similar, once we start adding other things to the list than
						// just all-day activities.
						<AllDayActivities activities={allDayActivities} />
					)}

					{isFetching ? (
						<Containers.Column>
							{Array.from({ length: 25 }).map((_, i) => (
								<Skeleton
									key={i}
									width={"100%"}
									height={`max(${rowHeight}px, 2vh)`}
									// TODO: theme-aware like with the border-top on the
									// regular (non-skeleton) timeline rows
									style={{ borderTop: "2px solid white" }}
								/>
							))}
						</Containers.Column>
					) : (
						<Suspense fallback={<DefaultSkeleton />}>
							<TimelineRows
								activities={timestampedActivities}
								currentDate={currentDate}
							/>
						</Suspense>
					)}
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
					<Habits habits={habits} />
					<Tasks activities={activities.filter((a) => a.is_task)} />
					<Notes />
				</Containers.Column>
			</S.Columns>

			<Modal
				modalId={modalIds.activities.tasks.overdue}
				initialOpen={false}
				scrollbarVisible
			>
				<h1
					style={{
						padding: 0,
						paddingBottom: spacingValue.small,
						margin: 0,
						marginTop: spacingValue.medium,
					}}
				>
					Overdue tasks
				</h1>
				<Containers.Column
					gap="small"
					padding="medium"
					// TODO: instead of this convoluted css prop, add a secondary
					// prop for the Task cards which makes the background darker
					css={(t) => overdueTasksColumnCss(t as MainTheme)}
				>
					{!!overdueTasks?.length &&
						overdueTasks.map((t) => <Task activity={t} key={t.activity_id} />)}
				</Containers.Column>
			</Modal>

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
		</Suspense>
	);
}
