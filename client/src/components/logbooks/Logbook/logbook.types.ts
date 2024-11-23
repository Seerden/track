import type { User } from "@t/data/user.types";
import type { Datelike, ID, Nullable, Timestamp } from "@t/data/utility.types";

/*
   squat    100kg    5 reps   working weight

   lichte 60c was    wassen
   lichte 60c was    ophangen

   distance  23km
   duration  1h15min


 */

type ValueType = string | number;

/** A FieldTemplate describes which fields are to be displayed. */
type FieldTemplate = {
	field_template_id: ID;
	user_id: ID;
	logbook_id: ID;

	name: string; // e.g. "weight"
	valueType: `${ValueType}`; // e.g. "number" or "string""
	unit: Nullable<string>; // e.g. "kg" or null for dimensionless values
};

/** A FieldEntry is just a filled-out template. */
type FieldEntry = {
	field_entry_id: ID;
	field_template_id: ID;
	logbook_id: ID;
	user_id: ID;

	value: ValueType; // the actual value for the given value type
};

/** ItemTemplate describes how a single item could look,
 * it represents e.g. a lift, which has a name, like "squat", and fields weight, sets, type
 */
type ItemTemplate = {
	item_template_id: ID;
	type: string; // e.g. "lift"
	name: string; // e.g. "squat"
	description: string; // e.g. "high-bar back squat"
	fields: FieldTemplate[]; // e.g. [weight: kg], [sets: <number> reps], [type: working weight]
};

/** ItemValues represents a filled-in ItemTemplate. For each field in the
 * template, it should contain a value*/
type ItemValue = {
	item_value_id: ID;
	logbook_entry_id: LogbookEntry["logbook_entry_id"];
	user_id: User["user_id"];

	item_template_id: ItemTemplate["item_template_id"];
	template: ItemTemplate; // joined from the template represented by item_template_id

	values: FieldEntry[]; // or call it FieldValue like with ItemValue??
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
type LogbookEntryTemplate = {
	logbook_entry_template_id: ID;
	logbook_entry_id: LogbookEntry["logbook_entry_id"];
	user_id: User["user_id"];

	name: Nullable<string>;

	items: ItemTemplate[];
};

/** LogbookEntryValue[] represents a single filled-in LogbookEntryTemplate.
 *  So there's a 1:N relationship between LogbookEntryTemplate and LogbookEntryValue
 */
type LogbookEntryValue = {
	logbook_entry_value_id: ID;
	logbook_entry_id: LogbookEntry["logbook_entry_id"];
	logboom_entry_template_id: LogbookEntryTemplate["logbook_entry_template_id"];
	user_id: User["user_id"];

	values: ItemValue[]; // this is a 1:N relationship between LogbookEntryValue and ItemValue
};

/** A LogbookEntry represents a filled-in session for a Logbook. */
type LogbookEntry = {
	logbook_entry_id: ID;
	logbook_id: Logbook["logbook_id"];
	user_id: User["user_id"];

	name: Nullable<string>;
	date: Datelike;
	start_time: Nullable<Timestamp>;
	end_time: Nullable<Timestamp>;

	values: LogbookEntryValue[]; // this is a 1:N relationship between LogbookEntry and LogbookEntryValue
};

/** A logbook contains any number of entries that presumably each denote a day,
 * or a session, or a subject, etc. For example, a "lifting" logbook, or a
 * "cycling" logbook" */
type Logbook = {
	logbook_id: ID;
	user_id: ID;
	created_at: Timestamp;

	name: string;

	entries: LogbookEntry[]; // this is a 1:N relationship between Logbook and LogbookEntry
};

export type {
	FieldEntry,
	FieldTemplate,
	ItemTemplate,
	ItemValue,
	Logbook,
	LogbookEntry,
	LogbookEntryTemplate,
	LogbookEntryValue
};
