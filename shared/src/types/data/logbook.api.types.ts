import {
	FieldTemplate,
	FieldValue,
	ItemRow,
	ItemTemplate,
	Log,
	Logbook,
} from "./logbook.types";

export type LogbookInput = {
	logbook: Logbook;
};

export type LogInput = {
	log: Log;
};

export type ItemTemplateAndFieldTemplates = {
	itemTemplate: ItemTemplate;
	fieldTemplates: FieldTemplate[];
};

export type Field = FieldTemplate & { values: FieldValue[] };

export type ItemRowWithFieldValues = {
	itemRow: ItemRow;
	fieldValues: FieldValue[];
};
