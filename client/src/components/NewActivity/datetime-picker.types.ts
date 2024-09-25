import { DateTimeField } from "../../types/form.types";

export type DateTimePickerProps = {
	setState: (args: { name: DateTimeField; value: string }) => void;
};
