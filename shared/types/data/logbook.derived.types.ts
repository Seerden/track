import { FieldTemplate, ValueType } from "@t/data/logbook.types";

export type FieldTemplateWithValue = FieldTemplate & {
	value: ValueType;
};
