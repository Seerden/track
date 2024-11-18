import type { DateTimeField } from "@/types/form.types";
import type { Datelike } from "@t/data/utility.types";

export type DateTimePickerProps = {
	setState: (args: { name: DateTimeField; value: Datelike }) => void;
};
