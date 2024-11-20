import type { DateTimeField } from "@/types/form.types";
import type { Datelike } from "@t/data/utility.types";

export type DateTimeStateSetter = (args: {
	name: DateTimeField;
	value: Datelike;
}) => void;

export type DateTimePickerProps = {
	setState: DateTimeStateSetter;
};
