import dayjs from "dayjs";
import { formatHour } from "../../lib/format-date";
import { ActivityWithIds } from "../../types/server/activity.types";
import { NoteWithIds } from "../../types/server/note.types";
import { ID } from "../../types/server/utility.types";
import {
	activityDuration,
	activityEnd,
	activityStart,
	activityStartHour
} from "./activity";
import * as S from "./Today.style";
import useToday from "./use-today";

function HourMark({ index }: { index: number }) {
	const label = formatHour(index);
	return <S.HourMark>{label}</S.HourMark>;
}

type RowProps = {
	index: number;
	activities: ActivityWithIds[];
	indentation: Map<ID, number>;
};

function Row({ index, activities, indentation }: RowProps) {
	return (
		<S.Row>
			<HourMark index={index} />

			{activities.map((a) => (
				<Activity key={a.activity_id} activity={a} indentation={indentation} />
			))}
		</S.Row>
	);
}

type ActivityProps = {
	activity: ActivityWithIds;
	indentation: Map<ID, number>;
};

function Activity({ activity, indentation }: ActivityProps) {
	const durationHours = activityDuration(activity);
	const offset = activityStart(activity).minute() / 60;
	const level = indentation.get(activity.activity_id) ?? 0;

	return (
		<S.ActivityCard key={activity.activity_id} $level={level} $offset={offset}>
			<S.Activity $durationHours={durationHours}>{activity.name}</S.Activity>
		</S.ActivityCard>
	);
}

type TasksProps = {
	activities: ActivityWithIds[];
};

function Task({ activity }: { activity: ActivityWithIds }) {
	return (
		<S.Task>
			<S.Checkbox type="checkbox" checked={activity.completed} />
			<span>{activity.name}</span>
			<div>
				{activityStart(activity).format("HH:mm")}
				{" - "}
				{activityEnd(activity).format("HH:mm")}
			</div>
		</S.Task>
	);
}

function Tasks({ activities }: TasksProps) {
	return (
		<S.TasksWrapper>
			<h2>Tasks</h2>
			{activities.map((a) => (
				<Task key={a.activity_id} activity={a} />
			))}
		</S.TasksWrapper>
	);
}

function Notes({ notes }: { notes: NoteWithIds[] }) {
	return (
		<S.NotesWrapper>
			<h2>Notes</h2>
			{notes.map((note) => (
				<div key={note.note_id}>
					<h3>{note.title}</h3>
					<p>{note.content}</p>
				</div>
			))}
		</S.NotesWrapper>
	);
}

export default function Today() {
	const { activities, indentation } = useToday();
	const today = dayjs();

	return (
		<S.Wrapper>
			<S.Title>Today</S.Title>

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
										(a) => activityStartHour(a, today) === i
									)}
									indentation={indentation}
								/>
							)
						)}
					</S.Rows>
				</S.TimelineWrapper>
				<Tasks activities={activities.filter((a) => a.is_task)} />
				<Notes notes={[]} />
			</S.Columns>
		</S.Wrapper>
	);
}
