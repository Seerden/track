import type { User } from "@t/data/user.types";
import type { Datelike, ID, Nullable, Timestamp } from "@t/data/utility.types";

export type ValueType = string | number | null;

/** A FieldTemplate describes which fields are to be displayed. */
export type FieldTemplate = {
	field_template_id: ID;
	logbook_id: ID;
	item_template_id: ItemTemplate["item_template_id"];

	/** @example "weight" which belongs to an item_template named "lift" */
	name: string; //
	/** e.g. "number" or "string"" */
	value_type: `${ValueType}`;
	/** @example "kg", or null for dimensionless values */
	unit: Nullable<string>;
	/** @example "the weight in kilograms" */
	description: Nullable<string>;
	/** Indicates the position of the field in the item */
	position: number;
	/** Not all fields are required, think of type "warmup" vs "working weight"
	 * in a lift. if not required, that means the value is nullable. */
	required: boolean;
	created_at: Timestamp;
};

/** ItemTemplate describes how a single generic item could look,
 * it represents e.g. a lift, which has a name, like "squat", and fields weight, sets, type
 */
export type ItemTemplate = {
	item_template_id: ID;
	logbook_id: Logbook["logbook_id"];
	name: string; // e.g. "lift"
	description: Nullable<string>; // e.g. "various types of lifts"
	standalone: boolean; // false for lifts, but probably true for meta items like dates etc.

	created_at: Timestamp;
};

/** A LogbookEntryTemplate describes what a logbook entry should look like.
 *  For example, a "lifting" logbook entry template could contain a number of
 *  "Lift" items, a number of "Warmup" items (e.g. cardio, stretch) and a single
 *  "note" item. This determines what a new entry should look like when
 *  rendered. If multiple lifts are to be recorded, the user should be able to
 *  add any number of "Lift" items to the entry.
 *   @todo: figure out constraints for the items, e.g. "at least one lift", not
 *   more than 3 lifts, etc. Also optional items, like "note" maybe isn't required.
 */
export type LogTemplate = {
	log_template_id: ID;
	logbook_id: Logbook["logbook_id"];
	name: Nullable<string>; // for example "PPL routine", which would be in the lifting logbook

	created_at: Timestamp;
};

/** Represents a filled-in value of a field.
 * @todo do we want to include `item_id`?
 */
export type FieldValue = {
	field_value_id: ID;
	field_template_id: FieldTemplate["field_template_id"];
	log_id: Log["log_id"];
	item_row_id: ItemRow["item_row_id"];

	/**the actual value for the given value type, this has to match the
	 * value_type in the FieldTemplate. this could be 5 if the field represents
	 * "reps" with value_type "number" */
	value: ValueType;

	created_at: Timestamp;
};

/**
 * Multiple rows can be created for the same item, e.g. a squat can have
 * multiple rows (3 sets with different weights, for example).
 */
export type ItemRow = {
	item_row_id: ID;
	item_id: Item["item_id"];
	log_id: Log["log_id"];
	/** The order of the row in the log -- I would usually call this "index" but
	 * maybe "position" is more descriptive */
	position: number;

	created_at: Timestamp;
};

/** An Item represents a filled-in ItemTemplate. For each meta field in the
 * template, it should contain a value. For now, that's "type", "name", "description"
 * @todo do we want to include logbook_id?
 */
export type Item = {
	item_id: ID;
	log_id: Log["log_id"];
	item_template_id: ItemTemplate["item_template_id"]; // template could have a template_name like "lift"
	name: string; // if the template's name is "lift", this could be "squat"

	created_at: Timestamp;
};

/** A Log represents a filled-in session for a Logbook. */
export type Log = {
	log_id: ID;
	logbook_id: Logbook["logbook_id"];
	log_template_id: LogTemplate["log_template_id"];

	/** the difference between `name` and log_template.name is that this is the
	 * actual log title. if log_template.name is "PPL routine", this could be
	 * "PPL routine - November 23rd 2024".
	 **/
	name: Nullable<string>;

	date: Datelike;
	start_time: Nullable<Timestamp>;
	end_time: Nullable<Timestamp>;

	created_at: Timestamp;
};

/** A logbook contains any number of entries that presumably each denote a day,
 * or a session, or a subject, etc. For example, a "lifting" logbook, or a
 * "cycling" logbook" */
export type Logbook = {
	logbook_id: ID;

	name: string;
	description: Nullable<string>;

	created_at: Timestamp;
	user_id: User["user_id"];
};
