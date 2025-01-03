import { FieldTemplate, ValueType } from "@t/data/logbook.types";

export type FieldTemplateWithValue = FieldTemplate & {
	value: NonNullable<ValueType>;
};

export type FieldTemplateWithMaybeValue = FieldTemplate & {
	value: NonNullable<ValueType> | null;
};
