import AllDayActivity from "@/components/Today/AllDayActivity";
import DetailedActivity from "@/components/Today/DetailedActivity";
import { activityStartHour } from "@lib/activity";
import T from "./AllDayActivity.style";
import useToday from "./hooks/use-today";
import Notes from "./Notes";
import Row from "./Row";
import Tasks from "./Tasks";
import S from "./Today.style";

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
			{/* TODO: rename TimelineHeader->Header ? */}
			<S.TimelineHeader>
				<h1>{currentDate.format("dddd (DD MMMM)")}</h1>
			</S.TimelineHeader>
			<S.Columns>
				<S.TimelineWrapper>
					<T.AllDayActivityList>
						{allDayActivities.map((activity) => (
							<AllDayActivity activity={activity} key={activity.activity_id} />
						))}
					</T.AllDayActivityList>

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

				<Tasks activities={activities.filter((a) => a.is_task)} />

				<Notes />
			</S.Columns>
			{shouldShowDetailedActivity && <DetailedActivity id={modalState.itemId} />}
		</S.Wrapper>
	);
}
