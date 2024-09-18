import type { ID, Maybe, Timestamp } from "./utility.types";

export type Note = {
	note_id: ID;
	user_id: ID;
	activity_id: Maybe<ID>;
	title?: string;
	content: string;
	created_at: Timestamp;
	date: Timestamp; // TODO: this is a date in postgres -- how does it get parsed?
};
