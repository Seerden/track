import type { FieldTemplate, ValueType } from "@t/data/logbook.types";

export type FieldTemplateWithMaybeValue = FieldTemplate & {
	value: ValueType | undefined;
};

// TODO: where this one is used, used the one from shared logbook.types instead
// (which is a copy of this one, but we now need it in the backend, hence it
// became shared)
export type FieldTemplateWithValue = FieldTemplate & {
	value: ValueType;
};
