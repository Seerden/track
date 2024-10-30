import AllDayActivity from "@/components/Today/AllDayActivity";
import DetailedActivity from "@/components/Today/DetailedActivity";
import { today } from "@/lib/datetime/make-date";
import { activityStartHour } from "@lib/activity";
import Notes from "./Notes";
import Row from "./Row";
import Tasks from "./Tasks";
import S from "./Today.style";
import useToday from "./use-today";

export default function Today() {
	const {
		activities,
		allDayActivities,
		timestampedActivities,
		indentation,
		currentDate,
		modalState,
		shouldShowDetailedActivity
	} = useToday();

	return (
		<S.Wrapper>
			<S.TimelineHeader>
				<h1>{today().format("dddd (DD MMMM)")}</h1>
			</S.TimelineHeader>
			<S.Columns>
				<S.TimelineWrapper>
					<S.AllDayActivityList>
						{allDayActivities.map((activity) => (
							<AllDayActivity activity={activity} key={activity.activity_id} />
						))}
					</S.AllDayActivityList>

					<S.Rows>
						{Array.from(
							{ length: 24 }, // render a row for every hour of the day
							(_, i) => (
								<Row
									key={i}
									index={i}
									activities={timestampedActivities.filter(
										(a) => activityStartHour(a, currentDate) === i
									)}
									indentation={indentation}
								/>
							)
						)}
					</S.Rows>
				</S.TimelineWrapper>
				{/* TODO: split up `activities` and `nonAllDayActivities`, because Tasks needs
             all of them, but the Rows, above, needs only the not-all-day ones */}
				<Tasks activities={activities.filter((a) => a.is_task)} />
				<Notes />
			</S.Columns>
			{shouldShowDetailedActivity && <DetailedActivity id={modalState.itemId} />}
		</S.Wrapper>
	);
}
