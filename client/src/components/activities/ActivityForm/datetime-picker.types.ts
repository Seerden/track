import type { DateTimeField } from "@/types/form.types";
import type { WithDates, WithTimestamps } from "@shared/types/data/activity.types";
import type { Datelike, Nullable } from "@shared/types/data/utility.types";

export type DateTimeStateSetter = (args: {
	name: DateTimeField;
	value: Nullable<Datelike>;
}) => void;

type DateTimePickerDefaultValues = WithDates | WithTimestamps;

export type DateTimePickerProps = {
	onChange: DateTimeStateSetter;
	defaultValues?: DateTimePickerDefaultValues;
};
