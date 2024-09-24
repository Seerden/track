import { TagWithIds } from "./tag.types";
import { ID, Timestamp } from "./utility.types";

/** An activity without autogenerated fields or tag/(sub)category ids. */
export type NewActivity = {
	user_id: ID;
	name: string;
	description: string;
	started_at?: Timestamp; // TODO: rename this to start_timestamp
	ended_at?: Timestamp; // TODO: rename this to end_timestamp
	start_date?: string; // YYYYMMDD
	end_date?: string;
	duration_milliseconds?: number; // in milliseconds
	is_task?: boolean;
	completion_timestamp?: Timestamp; // this probably shouldn't be in this type
	completed?: boolean; // this also probably shouldn't be in this type
};

/** An activity with autogenerated fields. */
export type Activity = NewActivity & {
	activity_id: ID;
	created_at: Timestamp;
};

/** An activity with (joined) tag fields. */
export type ActivityWithTags = Activity & {
	tags: TagWithIds[]; // many-to-many
};

export type ActivityWithIds = Activity & {
	tag_ids: ID[];
};

export type ActivityInput = {
	activity: NewActivity;
	tagIds?: ID[];
};
