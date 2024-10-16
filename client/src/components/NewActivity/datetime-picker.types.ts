import type { DateTimeField } from "@type/form.types";

export type DateTimePickerProps = {
	setState: (args: { name: DateTimeField; value: string }) => void;
};
