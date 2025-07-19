import {
	daysOfMonth,
	daysOfWeek,
	FREQUENCY,
	frequencyOptions,
	INTERVAL_UNIT
} from "@/components/activities/ActivityForm/RecurrenceForm/constants";
import DaySelector from "@/components/activities/ActivityForm/RecurrenceForm/DaySelector";
import SharedStyle from "@/components/activities/ActivityForm/RecurrenceForm/style/DaySelector.style";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import { Tooltip } from "@mantine/core";
import type { IntervalUnit } from "@shared/types/data/utility.types";
import { LucideAlertCircle } from "lucide-react";
import type useActivityForm from "../useActivityForm";
import S from "./style/RecurrenceForm.style";

export default function RecurrenceForm({
	recurrence,
	isRecurring,
	intervalUnitSuffix,
	toggleRecurring,
	updateRecurrence,
	setSelection,
	resetSelection,
	validRecurrence
}: Pick<
	ReturnType<typeof useActivityForm>,
	| "recurrence"
	| "isRecurring"
	| "intervalUnitSuffix"
	| "toggleRecurring"
	| "updateRecurrence"
	| "setSelection"
	| "resetSelection"
	| "validRecurrence"
>) {
	if (!isRecurring) {
		return (
			<S.Container>
				<S.CheckboxWrapper style={{ maxWidth: "max-content" }}>
					<span>Recurring activity?</span>
					<Checkbox checked={isRecurring} onChange={toggleRecurring} />
				</S.CheckboxWrapper>
			</S.Container>
		);
	}

	return (
		<S.Container style={{ position: "relative" }}>
			{!validRecurrence && (
				<span style={{ position: "absolute", top: 0, right: 0 }}>
					<Tooltip
						label={
							<div
								style={{
									display: "flex",
									width: "250px",
									textWrap: "wrap"
								}}
							>
								A fixed date recurrence needs at least 1 weekday or monthday, and
								a numeric recurrence needs a valid interval.
							</div>
						}
						position="top"
						color="orangered"
						withArrow
					>
						<LucideAlertCircle color="orangered" />
					</Tooltip>
				</span>
			)}
			<S.CheckboxWrapper style={{ maxWidth: "max-content" }}>
				<span>Recurring activity?</span>
				<Checkbox checked={isRecurring} onChange={toggleRecurring} />
			</S.CheckboxWrapper>
			<S.RecurrenceWrapper>
				<S.Column>
					{frequencyOptions.map((frequency) => (
						<S.Label key={frequency} $active={recurrence.frequency === frequency}>
							{/* TODO: Input.Hidden */}
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
								type="number"
								step={1}
								min={1}
								value={recurrence.interval}
								onChange={(e) =>
									updateRecurrence({
										type: "interval",
										value: Math.max(+e.target.value, 1)
									})
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
									selection={recurrence.weekdays}
									setSelection={setSelection("weekdays")}
									resetSelection={resetSelection}
									options={daysOfWeek}
									optionLabels={daysOfWeek.map((d) => d[0])}
									triggerLabel={"pick days of week"}
								/>
							) : (
								<DaySelector
									selection={recurrence.monthdays}
									setSelection={setSelection("monthdays")}
									resetSelection={resetSelection}
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
								type="number"
								step={1}
								min={1}
								value={recurrence.interval}
								onChange={(e) =>
									updateRecurrence({
										type: "interval",
										value: Math.max(+e.target.value, 1)
									})
								}
							/>
							<span>day{intervalUnitSuffix}</span>
						</S.IntervalContainer>
					</S.Column>
				)}
			</S.RecurrenceWrapper>
		</S.Container>
	);
}
