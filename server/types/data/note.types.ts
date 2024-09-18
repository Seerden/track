import type { ID, Maybe, Timestamp } from "./utility.types";

export type NewNote = {
	user_id: ID;
	activity_id: Maybe<ID>;
	title?: string;
	content: string;
	date: Timestamp; // TODO: this is a date in postgres -- how does it get parsed?
};

export type Note = NewNote & {
	note_id: ID;
	created_at: Timestamp;
};
