import { ID, IntervalUnit, Nullable, Timestamp } from "./utility.types";

export type Recurrence = {
	recurrence_id: ID;
	user_id: ID;
	interval: number;
	interval_unit: IntervalUnit; // implement this utility type and also use it in Habit
	frequency: number;
	start_timestamp: Timestamp;
	end_timestamp: Nullable<Timestamp>;
	created_at: Timestamp;
};

type Bigint = string; // database returns bigints as strings;

export type Occurrence =
	| ({
			occurrence_id: ID;
			recurrence_id: ID;
			user_id: ID;
			activity_id: ID;
			divergence_count: number;
	  } & {
			divergence_kind: "offset";
			offset_milliseconds: Bigint;
	  })
	| {
			divergence_kind: "skip";
			offset_milliseconds: null;
	  };