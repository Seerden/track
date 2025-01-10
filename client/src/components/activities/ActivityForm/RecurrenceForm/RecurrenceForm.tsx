import DaySelector from "@/components/activities/ActivityForm/RecurrenceForm/DaySelector";
import SharedStyle from "@/components/activities/ActivityForm/RecurrenceForm/style/shared.style";
import useRecurrenceForm, {
	frequencyOptions
} from "@/components/activities/ActivityForm/RecurrenceForm/useRecurrenceForm";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import day from "@/lib/dayjs";
import type { NewRecurrenceInput } from "@shared/types/data/recurrence.types";
import { useState } from "react";
import S from "./style/RecurrenceForm.style";

export default function RecurrenceForm() {
	const {
		isRecurring,
		recurrence,
		intervalUnitSuffix,
		toggleRecurring,
		setRecurrenceFrequency,
		setRecurrenceInterval,
		setRecurrenceIntervalUnit
	} = useRecurrenceForm();

	// TODO: when changing the interval_unit, reset the other unit's selection
	const [daysOfWeekSelection, setDaysOfWeekSelection] = useState<string[]>([]);
	const [daysOfMonthSelection, setDaysOfMonthSelection] = useState<number[]>([]);

	const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1).reduce((acc, day) => {
		if (!((day - 1) % 7)) {
			acc.push([day]);
		} else {
			acc.at(-1)?.push(day);
		}
		return acc;
	}, [] as number[][]);

	return (
		<S.Container>
			<S.CheckboxWrapper>
				<span>Recurring activity?</span>
				<Checkbox checked={isRecurring} onChange={toggleRecurring} />
			</S.CheckboxWrapper>
			{isRecurring && (
				<>
					<S.RecurrenceWrapper>
						<S.Column>
							{frequencyOptions.map((frequency) => (
								<S.Label
									key={frequency}
									$active={recurrence.frequency === frequency}
								>
									<input
										style={{ width: 0 }}
										type="radio"
										name="frequency"
										value={frequency}
										onChange={() => setRecurrenceFrequency(frequency)}
									/>
									<span>
										{frequency === "calendar" ? "fixed date" : "interval"}
									</span>
								</S.Label>
							))}
						</S.Column>

						{/* fixed date (= "calendar" frequency) */}
						{recurrence.frequency === "calendar" ? (
							<S.Column>
								<S.IntervalContainer>
									<span>every</span>
									<SharedStyle.NumberInput
										value={recurrence.interval}
										onChange={(e) => setRecurrenceInterval(+e.target.value)}
									/>
									<SharedStyle.Select
										value={recurrence.interval_unit}
										onChange={(e) =>
											setRecurrenceIntervalUnit(
												e.target
													.value as NewRecurrenceInput["newRecurrence"]["interval_unit"]
											)
										}
									>
										<option value="week">week{intervalUnitSuffix}</option>
										<option value="month">month{intervalUnitSuffix}</option>
									</SharedStyle.Select>
								</S.IntervalContainer>
								<div>
									{recurrence.interval_unit === "week" ? (
										<DaySelector
											selection={daysOfWeekSelection}
											setSelection={setDaysOfWeekSelection}
											options={day.weekdays()}
											optionLabels={day.weekdays().map((d) => d[0])}
											triggerLabel={"pick days of week"}
										/>
									) : (
										<DaySelector
											selection={daysOfMonthSelection}
											setSelection={setDaysOfMonthSelection}
											options={daysOfMonth}
											triggerLabel={"pick days of month"}
										/>
									)}
								</div>
							</S.Column>
						) : (
							/* interval (= "numeric" frequency) */
							<S.Column>
								<S.IntervalContainer>
									<span>every</span>
									<SharedStyle.NumberInput
										value={recurrence.interval}
										onChange={(e) => setRecurrenceInterval(+e.target.value)}
									/>
									<span>day{intervalUnitSuffix}</span>
								</S.IntervalContainer>
							</S.Column>
						)}
					</S.RecurrenceWrapper>
				</>
			)}
			Preview: ...
		</S.Container>
	);
}
