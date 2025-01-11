import {
	defaultRecurrence,
	INTERVAL_UNIT,
	type FREQUENCY
} from "@/components/activities/ActivityForm/RecurrenceForm/constants";
import type { NewRecurrenceInput } from "@shared/types/data/recurrence.types";
import type { DayOfWeek, IntervalUnit } from "@shared/types/data/utility.types";
import { produce } from "immer";
import { useState } from "react";

export type NewRecurrenceState = NewRecurrenceInput["newRecurrence"];

type UpdateRecurrencePayload =
	| {
			type: "intervalUnit";
			value: IntervalUnit;
	  }
	| {
			type: "frequency";
			value: `${FREQUENCY}`;
	  }
	| {
			type: "interval";
			value: number;
	  };

type SetRecurrenceSelection =
	| { type: "weekdays"; value: DayOfWeek }
	| { type: "monthdays"; value: number };

export default function useRecurrenceForm() {
	const [isRecurring, setIsRecurring] = useState(false);
	const [recurrence, setRecurrence] = useState<NewRecurrenceState>(defaultRecurrence);
	const intervalUnitSuffix = recurrence.interval > 1 ? "s" : "";

	function resetSelection() {
		setRecurrence(
			produce((draft) => {
				draft.weekdays = [];
				draft.monthdays = [];
			})
		);
	}

	function setSelection<T extends SetRecurrenceSelection["type"]>(type: T) {
		return (value: Extract<SetRecurrenceSelection, { type: T }>["value"]) =>
			setRecurrence(
				produce((draft) => {
					// The logic for these cases is basically the same, but the
					// typing is different, so it's easier to write it out twice.
					if (type === "weekdays") {
						const v = value as DayOfWeek;
						draft.monthdays = null;

						draft.weekdays ??= [];
						if (draft.weekdays.includes(v)) {
							draft.weekdays.splice(draft.weekdays.indexOf(v), 1);
						} else {
							draft.weekdays.push(v);
						}
					} else {
						const v = value as number;
						draft.monthdays ??= [];

						if (draft.monthdays.includes(v)) {
							draft.monthdays.splice(draft.monthdays.indexOf(v), 1);
						} else {
							draft.monthdays.push(v);
						}

						draft.weekdays = null;
					}
				})
			);
	}

	function toggleRecurring() {
		setIsRecurring((current) => !current);
	}

	function updateRecurrence({ type, value }: UpdateRecurrencePayload) {
		switch (type) {
			case "intervalUnit":
				setRecurrence(
					produce((draft) => {
						draft.interval_unit = value;
					})
				);
				resetSelection();
				break;
			case "frequency":
				setRecurrence(
					produce((draft) => {
						draft.interval = 1;

						draft.interval_unit =
							draft.interval_unit === INTERVAL_UNIT.DAY
								? INTERVAL_UNIT.WEEK
								: INTERVAL_UNIT.DAY;

						draft.frequency = value;
					})
				);
				resetSelection();
				break;
			case "interval":
				setRecurrence(
					produce((draft) => {
						draft.interval = value;
					})
				);
				break;
		}
	}

	return {
		isRecurring,
		recurrence,
		intervalUnitSuffix,
		toggleRecurring,
		updateRecurrence,
		setSelection,
		resetSelection
	};
}
