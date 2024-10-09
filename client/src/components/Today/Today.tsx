import { activityStartHour } from "../../lib/activity";
import Notes from "./Notes";
import Row from "./Row";
import Tasks from "./Tasks";
import * as S from "./Today.style";
import useToday from "./use-today";

export default function Today() {
	const { activities, indentation, currentDate } = useToday();

	return (
		<S.Wrapper>
			<S.Columns>
				<S.TimelineWrapper>
					<S.Rows>
						{Array.from(
							{ length: 24 }, // render a row for every hour of the day
							(_, i) => (
								<Row
									key={i}
									index={i}
									activities={activities.filter(
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
		</S.Wrapper>
	);
}
