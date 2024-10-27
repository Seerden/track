import type { Datelike } from "@/types/date.types";
import type { DateTimeField } from "@type/form.types";

export type DateTimePickerProps = {
	setState: (args: { name: DateTimeField; value: Datelike }) => void;
};
