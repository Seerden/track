import AllDayActivity from "@/components/Today/AllDayActivity";
import DetailedActivity from "@/components/Today/DetailedActivity";
import { activityStartHour } from "@lib/activity";
import Notes from "./Notes";
import Row from "./Row";
import Tasks from "./Tasks";
import S from "./Today.style";
import useToday from "./use-today";

export default function Today() {
	const {
		activities,
		indentation,
		currentDate,
		modalState,
		shouldShowDetailedActivity,
		allDayActivities
	} = useToday();

	return (
		<S.Wrapper>
			<S.Columns>
				<S.TimelineWrapper>
					<ul>
						{allDayActivities.map((activity) => (
							<AllDayActivity activity={activity} key={activity.activity_id} />
						))}
					</ul>

					<S.Rows>
						{Array.from(
							{ length: 24 }, // render a row for every hour of the day
							(_, i) => (
								<Row
									key={i}
									index={i}
									activities={activities.filter(
										// TODO: here, also exclude all-day activities in
										// the case that we do not want to display them
										// directly on the timeline
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
