import { FieldTemplate, ValueType } from "./logbook.types";

export type FieldTemplateWithValue = FieldTemplate & {
	value: NonNullable<ValueType>;
};

export type FieldTemplateWithMaybeValue = FieldTemplate & {
	value: NonNullable<ValueType> | null;
};
