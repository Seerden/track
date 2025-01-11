import {
	defaultRecurrence,
	INTERVAL_UNIT,
	type FREQUENCY
} from "@/components/activities/ActivityForm/RecurrenceForm/constants";
import type { NewRecurrenceInput } from "@shared/types/data/recurrence.types";
import type { IntervalUnit } from "@shared/types/data/utility.types";
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

export default function useRecurrenceForm() {
	const [isRecurring, setIsRecurring] = useState(false);
	const [recurrence, setRecurrence] = useState<NewRecurrenceState>(defaultRecurrence);
	const intervalUnitSuffix = recurrence.interval > 1 ? "s" : "";
	const [daysOfWeekSelection, setDaysOfWeekSelection] = useState<string[]>([]);
	const [daysOfMonthSelection, setDaysOfMonthSelection] = useState<number[]>([]);

	function resetSelections() {
		setDaysOfWeekSelection([]);
		setDaysOfMonthSelection([]);
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
				resetSelections();
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
				resetSelections();
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
		daysOfWeekSelection,
		setDaysOfWeekSelection,
		daysOfMonthSelection,
		setDaysOfMonthSelection
	};
}
