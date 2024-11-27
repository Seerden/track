// Because of the complexity of the feature, I'm not going to build the types up
// sequentially like with other data types, but instead I'm going to define the
// partial types after the main type.

import {
	FieldTemplate,
	FieldValue,
	Item,
	ItemRow,
	ItemTemplate,
	Log,
	Logbook,
	LogTemplate,
} from "./logbook.types";
import { OmitStrict } from "./utility.types";

export type NewLogbook = OmitStrict<Logbook, "logbook_id" | "created_at">;

export type NewLogTemplate = OmitStrict<
	LogTemplate,
	"log_template_id" | "created_at"
>;

export type NewLog = OmitStrict<Log, "log_id" | "created_at">;

export type NewItemTemplate = OmitStrict<
	ItemTemplate,
	"item_template_id" | "created_at"
>;

export type NewItem = OmitStrict<Item, "item_id" | "created_at">;

export type NewItemRow = OmitStrict<ItemRow, "item_row_id" | "created_at">;

export type NewFieldTemplate = OmitStrict<
	FieldTemplate,
	"field_template_id" | "created_at" | "item_template_id"
>;

/** NewFieldTemplate with item_template_id */
export type NewFieldTemplateWithId = OmitStrict<
	FieldTemplate,
	"field_template_id" | "created_at"
>;

export type NewFieldValue = OmitStrict<
	FieldValue,
	"created_at" | "field_value_id" | "item_row_id"
>;

/** NewFieldValue with item_row_id */
export type NewFieldValueWithId = OmitStrict<
	FieldValue,
	"created_at" | "field_value_id"
>;