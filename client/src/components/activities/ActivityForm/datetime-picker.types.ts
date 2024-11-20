import type { DateTimeField } from "@/types/form.types";
import type { WithDates, WithTimestamps } from "@t/data/activity.types";
import type { Datelike } from "@t/data/utility.types";

export type DateTimeStateSetter = (args: {
	name: DateTimeField;
	value: Datelike;
}) => void;

type DateTimePickerDefaultValues = WithDates | WithTimestamps;

export type DateTimePickerProps = {
	setState: DateTimeStateSetter;
	defaultValues?: DateTimePickerDefaultValues;
};
