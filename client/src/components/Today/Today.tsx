import dayjs from "dayjs";
import { formatHour } from "../../lib/format-date";
import useNotesQuery from "../../lib/use-notes-query";
import useTagsQuery from "../../lib/use-tags-query";
import { Datelike } from "../../types/date.types";
import { ActivityWithIds } from "../../types/server/activity.types";
import { NoteWithIds } from "../../types/server/note.types";
import { TagWithIds } from "../../types/server/tag.types";
import { ById, ID } from "../../types/server/utility.types";
import TagCard from "../TagCard/TagCard";
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

type TaskProps = {
	activity: ActivityWithIds;
	tagsById?: ById<TagWithIds>;
};

function Task({ activity, tagsById }: TaskProps) {
	// TODO: I'm reusing this type of logic all over the place, make it reusable.
	// TODO: do not do this here, but in a hook
	const tags = Object.values(tagsById ?? {}).filter((tag) =>
		activity.tag_ids.includes(tag.tag_id)
	);

	return (
		<S.Task>
			<S.Checkbox type="checkbox" checked={activity.completed} />
			<S.TaskName>{activity.name}</S.TaskName>
			<S.Times>
				{activityStart(activity).format("HH:mm")}
				{" - "}
				{activityEnd(activity).format("HH:mm")}
			</S.Times>
			<S.Tags>
				{tags.map((tag) => (
					<TagCard key={tag.tag_id} tag={tag} />
				))}
			</S.Tags>
		</S.Task>
	);
}

type TasksProps = {
	activities: ActivityWithIds[];
};

function Tasks({ activities }: TasksProps) {
	const { data: tags } = useTagsQuery();

	return (
		<S.TasksWrapper>
			<S.BlockTitle>Tasks</S.BlockTitle>
			<S.Tasks>
				{activities.map((a) => (
					<Task key={a.activity_id} activity={a} tagsById={tags?.tagsById} />
				))}
			</S.Tasks>
		</S.TasksWrapper>
	);
}

function isToday(date: Datelike) {
	const today = dayjs.utc().local();
	return dayjs.utc(date).local().isSame(today, "day");
}

type NoteProps = {
	note: NoteWithIds;
	tagsById?: ById<TagWithIds>;
};

function Note({ note, tagsById }: NoteProps) {
	const tags = Object.values(tagsById ?? {}).filter((tag) =>
		note.tag_ids?.includes(tag.tag_id)
	);
	return (
		<S.Note>
			{note.title?.length && <S.NoteTitle>{note.title}</S.NoteTitle>}
			<S.NoteContent>{note.content}</S.NoteContent>
			<S.Tags>
				{tags.map((tag) => (
					<TagCard key={tag.tag_id} tag={tag} />
				))}
			</S.Tags>
		</S.Note>
	);
}

function Notes() {
	const { data } = useNotesQuery();
	const { data: tags } = useTagsQuery();

	const notes = Object.values(data?.notesById ?? {}).filter((note) =>
		// TODO: note.date is not a field in the client when creating a new note,
		// so it will always be undefined currently. So using created_at is a
		// temporary solution.
		isToday(note.date ?? note.created_at)
	);
	return (
		<S.NotesWrapper>
			<S.BlockTitle>Notes</S.BlockTitle>
			{notes.map((note) => (
				<Note key={note.note_id} note={note} tagsById={tags?.tagsById} />
			))}
		</S.NotesWrapper>
	);
}

export default function Today() {
	const { activities, indentation } = useToday();
	const today = dayjs();

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
										(a) => activityStartHour(a, today) === i
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
