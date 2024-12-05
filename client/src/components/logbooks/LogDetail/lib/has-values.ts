import type { FieldTemplate, ValueType } from "@t/data/logbook.types";

type FieldTemplateWithMaybeValue = FieldTemplate & {
	value: ValueType | undefined;
};

export type FieldTemplateWithValue = FieldTemplate & {
	value: ValueType;
};

function hasValue(field: FieldTemplateWithMaybeValue): field is FieldTemplateWithValue {
	return field.value !== undefined;
}

export function hasValues(
	fields: FieldTemplateWithMaybeValue[]
): fields is FieldTemplateWithValue[] {
	return fields.every(hasValue);
}
