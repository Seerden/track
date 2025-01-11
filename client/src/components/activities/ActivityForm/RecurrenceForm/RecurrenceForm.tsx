import {
	daysOfMonth,
	daysOfWeek,
	FREQUENCY,
	frequencyOptions,
	INTERVAL_UNIT
} from "@/components/activities/ActivityForm/RecurrenceForm/constants";
import DaySelector from "@/components/activities/ActivityForm/RecurrenceForm/DaySelector";
import SharedStyle from "@/components/activities/ActivityForm/RecurrenceForm/style/shared.style";
import useRecurrenceForm from "@/components/activities/ActivityForm/RecurrenceForm/useRecurrenceForm";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import type { IntervalUnit } from "@shared/types/data/utility.types";
import S from "./style/RecurrenceForm.style";

export default function RecurrenceForm() {
	const {
		isRecurring,
		recurrence,
		intervalUnitSuffix,
		toggleRecurring,
		updateRecurrence,
		daysOfWeekSelection,
		setDaysOfWeekSelection,
		daysOfMonthSelection,
		setDaysOfMonthSelection
	} = useRecurrenceForm();

	if (!isRecurring) {
		return (
			<S.Container>
				<S.CheckboxWrapper>
					<span>Recurring activity?</span>
					<Checkbox checked={isRecurring} onChange={toggleRecurring} />
				</S.CheckboxWrapper>
			</S.Container>
		);
	}

	return (
		<S.Container>
			<S.CheckboxWrapper>
				<span>Recurring activity?</span>
				<Checkbox checked={isRecurring} onChange={toggleRecurring} />
			</S.CheckboxWrapper>
			<S.RecurrenceWrapper>
				<S.Column>
					{frequencyOptions.map((frequency) => (
						<S.Label key={frequency} $active={recurrence.frequency === frequency}>
							<input
								style={{ width: 0 }}
								type="radio"
								name="frequency"
								value={frequency}
								onChange={() =>
									updateRecurrence({ type: "frequency", value: frequency })
								}
							/>
							<span>
								{frequency === FREQUENCY.CALENDAR ? "fixed date" : "interval"}
							</span>
						</S.Label>
					))}
				</S.Column>

				{/* fixed date (= "calendar" frequency) */}
				{recurrence.frequency === FREQUENCY.CALENDAR ? (
					<S.Column>
						<S.IntervalContainer>
							<span>every</span>
							<SharedStyle.NumberInput
								value={recurrence.interval}
								onChange={(e) =>
									updateRecurrence({ type: "interval", value: +e.target.value })
								}
							/>
							<SharedStyle.Select
								value={recurrence.interval_unit}
								onChange={(e) =>
									updateRecurrence({
										type: "intervalUnit",
										value: e.target.value as IntervalUnit
									})
								}
							>
								<option value="week">week{intervalUnitSuffix}</option>
								<option value="month">month{intervalUnitSuffix}</option>
							</SharedStyle.Select>
						</S.IntervalContainer>
						<div>
							{recurrence.interval_unit === INTERVAL_UNIT.WEEK ? (
								<DaySelector
									selection={daysOfWeekSelection}
									setSelection={setDaysOfWeekSelection}
									options={daysOfWeek}
									optionLabels={daysOfWeek.map((d) => d[0])}
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
								onChange={(e) =>
									updateRecurrence({ type: "interval", value: +e.target.value })
								}
							/>
							<span>day{intervalUnitSuffix}</span>
						</S.IntervalContainer>
					</S.Column>
				)}
			</S.RecurrenceWrapper>
			Preview: ...
		</S.Container>
	);
}
