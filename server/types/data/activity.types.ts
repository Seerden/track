import { TagWithIds } from "./tag.types";
import { ID, Timestamp } from "./utility.types";

/** An activity without autogenerated fields or tag/(sub)category ids. */
export type NewActivity = {
	user_id: ID;
	name: string;
	description: string;
	duration_milliseconds?: number; // in milliseconds
	is_task?: boolean;
	start_date?: string;
	end_date?: string;
	started_at?: Timestamp; // TODO: should be start_timestamp
	ended_at?: Timestamp; // TODO: should be end_timestamp
};

export type ActivityUpdate = {
	completion_timestamp?: Timestamp;
	completed?: boolean;
};

/** An activity with autogenerated fields. */
export type Activity = NewActivity &
	ActivityUpdate & {
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
