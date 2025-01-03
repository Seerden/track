import type {
	FieldTemplateWithMaybeValue,
	FieldTemplateWithValue
} from "@shared/types/data/logbook.types";

// TODO: the two types we import are functionally identical, because we do not
// allow 'undefined' in the database. The rest of the logic makes sense, though.
// We can amend this semantic issue by making FieldTemplateWithValue.value not
// nullable, and changing hte ...MaybeValue to be value | null

function hasValueOrIsOptional(
	field: FieldTemplateWithMaybeValue
): field is FieldTemplateWithValue {
	return !field.required || field.value !== null;
}

export function eachRequiredFieldHasValue(
	fields: FieldTemplateWithMaybeValue[]
): fields is FieldTemplateWithValue[] {
	for (const field of fields) {
		if (!hasValueOrIsOptional(field)) return false;
	}
	return true;
}
