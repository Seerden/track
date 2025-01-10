import type { NewRecurrenceInput } from "@shared/types/data/recurrence.types";
import { produce } from "immer";
import { useState } from "react";

type NewRecurrenceState = NewRecurrenceInput["newRecurrence"];

const defaultRecurrence: NewRecurrenceState = {
	start_timestamp: new Date().toISOString(),
	interval: 1,
	interval_unit: "day",
	monthdays: null,
	weekdays: null,
	frequency: "numeric",
	end_timestamp: null
};

export const frequencyOptions = [
	"numeric",
	"calendar"
] as NewRecurrenceState["frequency"][];

export default function useRecurrenceForm() {
	const [isRecurring, setIsRecurring] = useState(false);
	const [recurrence, setRecurrence] = useState<NewRecurrenceState>(defaultRecurrence);

	const intervalUnitSuffix = recurrence.interval > 1 ? "s" : "";

	function toggleRecurring() {
		setIsRecurring((current) => !current);
	}

	function setRecurrenceInterval(interval: NewRecurrenceState["interval"]) {
		setRecurrence(
			produce((draft) => {
				draft.interval = interval;
			})
		);
	}

	function setRecurrenceIntervalUnit(intervalUnit: NewRecurrenceState["interval_unit"]) {
		setRecurrence(
			produce((draft) => {
				draft.interval_unit = intervalUnit;
			})
		);
	}

	function toggleRecurrenceIntervalUnit() {
		setRecurrence(
			produce((draft) => {
				draft.interval_unit = draft.interval_unit === "day" ? "week" : "day";
			})
		);
	}

	// TODO: we can use a single reducer-like function to handle these
	// setRecurrence... functions.
	/** Change the recurrence frequency, and reset the interval state accordingly. */
	function setRecurrenceFrequency(frequency: NewRecurrenceState["frequency"]) {
		setRecurrenceInterval(1);
		toggleRecurrenceIntervalUnit();

		setRecurrence(
			produce((draft) => {
				draft.frequency = frequency;
			})
		);
	}

	return {
		isRecurring,
		recurrence,
		intervalUnitSuffix,
		toggleRecurring,
		setRecurrenceFrequency,
		setRecurrenceInterval,
		setRecurrenceIntervalUnit
	};
}
