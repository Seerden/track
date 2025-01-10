import DayOfMonthSelector from "@/components/activities/ActivityForm/RecurrenceForm/DayOfMonthSelector";
import DayOfWeekSelector from "@/components/activities/ActivityForm/RecurrenceForm/DayOfWeekSelector";
import SharedStyle from "@/components/activities/ActivityForm/RecurrenceForm/style/shared.style";
import useRecurrenceForm, {
	frequencyOptions
} from "@/components/activities/ActivityForm/RecurrenceForm/useRecurrenceForm";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
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
										<DayOfWeekSelector
											selection={daysOfWeekSelection}
											setSelection={setDaysOfWeekSelection}
										/>
									) : (
										<DayOfMonthSelector
											selection={daysOfMonthSelection}
											setSelection={setDaysOfMonthSelection}
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
