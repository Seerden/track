import {
	ID,
	IntervalUnit,
	Nullable,
	OmitStrict,
	Timestamp,
} from "./utility.types";

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
export type RecurrenceInput = {
	recurrence: Recurrence;
};

export type NewRecurrence = OmitStrict<
	Recurrence,
	"recurrence_id" | "created_at"
>;
export type NewRecurrenceInput = {
	newRecurrence: OmitStrict<NewRecurrence, "user_id">;
};

type Bigint = string; // database returns bigints as strings;

type OccurrenceDivergenceBase =
	| {
			divergence_kind: "offset";
			offset_milliseconds: Bigint;
	  }
	| {
			divergence_kind: "skip";
			offset_milliseconds: null;
	  };

export type Occurrence = {
	occurrence_id: ID;
	recurrence_id: ID;
	user_id: ID;
	activity_id: ID;
	divergence_count: number;
	excluded_activity_ids: ID[];
} & OccurrenceDivergenceBase;

export type OccurrenceInput = {
	occurrence: Occurrence;
};
export type NewOccurrence = OmitStrict<Occurrence, "occurrence_id">;
export type NewOccurrenceInput = {
	newOccurrence: OmitStrict<NewOccurrence, "user_id">;
};
