import type {
	FieldTemplateWithMaybeValue,
	FieldTemplateWithValue
} from "@/components/logbooks/logbook.types";

function hasValue(field: FieldTemplateWithMaybeValue): field is FieldTemplateWithValue {
	return field.value !== undefined;
}

export function hasValues(
	fields: FieldTemplateWithMaybeValue[]
): fields is FieldTemplateWithValue[] {
	return fields.every(hasValue);
}
