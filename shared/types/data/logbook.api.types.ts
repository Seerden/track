import {
	FieldTemplate,
	FieldValue,
	ItemRow,
	ItemTemplate,
	Logbook,
} from "@t/data/logbook.types";

export type LogbookInput = {
	logbook: Logbook;
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
