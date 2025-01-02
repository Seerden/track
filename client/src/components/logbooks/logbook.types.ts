import type { FieldTemplate, ValueType } from "@t/data/logbook.types";

export type FieldTemplateWithMaybeValue = FieldTemplate & {
	value: ValueType | undefined;
};
