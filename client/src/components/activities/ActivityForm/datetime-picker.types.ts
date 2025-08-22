import type { WithDates, WithTimestamps } from "@shared/lib/schemas/activity";
import type { Datelike } from "@shared/lib/schemas/timestamp";
import type { Nullable } from "@shared/types/data/utility.types";
import type { DateTimeField } from "@/types/form.types";

export type DateTimeStateSetter = (args: {
	name: DateTimeField;
	value: Nullable<Datelike>;
}) => void;

type DateTimePickerDefaultValues = WithDates | WithTimestamps;

export type DateTimePickerProps = {
	onChange: DateTimeStateSetter;
	defaultValues?: DateTimePickerDefaultValues;
};
