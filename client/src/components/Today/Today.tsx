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
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import Notes from "./Notes";
import S from "./style/Today.style";
import Tasks from "./Tasks";

export default function Today() {
	const {
		activities,
		allDayActivities,
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
							{title}
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
						</h1>
					</S.Header>
					{!!allDayActivities.length && (
						<AllDayActivities activities={allDayActivities} />
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
				<S.Things padding="medium">
					<Habits habitsById={habitsById} />
					<Tasks activities={activities.filter((a) => a.is_task)} />
					<Notes />
				</S.Things>
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
