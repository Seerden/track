import type { DateTimeField } from "@/types/form.types";
import type { Datelike, Maybe } from "@t/data/utility.types";

export type DateTimeStateSetter = (args: {
	name: DateTimeField;
	value: Datelike;
}) => void;

type DateTimePickerDefaultValues = {
	[key in DateTimeField]: Maybe<Datelike>;
};

export type DateTimePickerProps = {
	setState: DateTimeStateSetter;
	defaultValues?: DateTimePickerDefaultValues;
};
