import type { ID } from "./utility.types";

export type ActivityTagRelation = {
	user_id: ID;
	tag_id: ID;
	activity_id: ID;
};

export type TagTagRelation = {
	user_id: ID;
	parent_id: ID;
	child_id: ID;
};

export type NoteTagRelation = {
	note_id: ID;
	tag_id: ID;
	user_id: ID;
	created_at: Date;
};

/** Matches the shape of the `habits_tags` table. */
export type HabitTagRelation = {
	habit_id: ID;
	tag_id: ID;
	user_id: ID;
	created_at: Date;
};
