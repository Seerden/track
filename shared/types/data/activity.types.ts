import type { Datelike, ID, NullUnused, Timestamp } from "./utility.types";

type ActivityTimestamps = {
	started_at: Timestamp; // TODO: should become start_timestamp
	ended_at: Timestamp; // TODO: should become end_timestamp
};

type ActivityDates = {
	start_date: Datelike;
	end_date: Datelike;
};

/** An activity without autogenerated fields or tag/(sub)category ids. */
export type NewActivityBase = {
	user_id: ID;
	name: string;
	description: string;
	duration_milliseconds?: number; // in milliseconds
	is_task?: boolean;
};

export type WithTimestamps = NullUnused<ActivityTimestamps, ActivityDates>;
export type WithDates = NullUnused<ActivityDates, ActivityTimestamps>;

export type ActivityWithTimestamps = NewActivityBase & WithTimestamps;
export type ActivityWithDates = NewActivityBase & WithDates;

export type NewActivity = NewActivityBase &
	(ActivityWithTimestamps | ActivityWithDates);

// TODO: rename this to TaskUpdate
export type ActivityUpdate = {
	completion_start?: Timestamp;
	completion_end?: Timestamp;
	completed?: boolean;
};

export type ActivityUpdateInput = ActivityUpdate &
	Pick<Activity, "activity_id">;

/** An activity with autogenerated fields. */
export type Activity = NewActivity &
	ActivityUpdate & {
		activity_id: ID;
		created_at: Timestamp;
	};

export type ActivityWithIds = Activity & {
	tag_ids: ID[];
};

export type ActivityInput = {
	activity: NewActivity;
	tagIds?: ID[];
};
