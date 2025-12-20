import { Select, Tooltip } from "@mantine/core";
import type { IntervalUnit } from "@shared/types/data/utility.types";
import { LucideAlertCircle } from "lucide-react";
import {
	daysOfMonth,
	daysOfWeek,
	FREQUENCY,
	frequencyOptions,
	INTERVAL_UNIT,
} from "@/components/activities/ActivityForm/RecurrenceForm/constants";
import DaySelector from "@/components/activities/ActivityForm/RecurrenceForm/DaySelector";
import Containers from "@/lib/theme/components/container.style";
import { font } from "@/lib/theme/font";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import type useActivityForm from "../useActivityForm";
import S from "./style/RecurrenceForm.style";

export default function RecurrenceForm({
	recurrence,
	isRecurring,
	intervalUnitSuffix,
	updateRecurrence,
	setSelection,
	resetSelection,
	validRecurrence,
}: Pick<
	ReturnType<typeof useActivityForm>,
	| "recurrence"
	| "isRecurring"
	| "intervalUnitSuffix"
	| "updateRecurrence"
	| "setSelection"
	| "resetSelection"
	| "validRecurrence"
>) {
	if (!isRecurring) {
		return null;
	}

	return (
		<S.Container style={{ position: "relative" }}>
			{!validRecurrence && (
				<span
					style={{
						position: "absolute",
						top: spacingValue.smaller,
						right: spacingValue.smaller,
					}}
				>
					<Tooltip
						label={
							<div
								style={{ display: "flex", width: "250px", textWrap: "wrap" }}
							>
								A fixed date recurrence needs at least 1 weekday or monthday,
								and a numeric recurrence needs a valid interval.
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

			<Containers.Row gap="medium" padding="medium">
				<S.Column>
					{frequencyOptions.map((frequency) => (
						<S.Label
							key={frequency}
							$active={recurrence.frequency === frequency}
						>
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
						<Containers.Row
							gap="small"
							style={{
								alignItems: "center",
								height: "1.5rem",
							}}
						>
							<span>every</span>
							<S.DaySelector.NumberInput
								type="number"
								step={1}
								min={1}
								value={recurrence.interval}
								onChange={(e) =>
									updateRecurrence({
										type: "interval",
										value: Math.max(+e.target.value, 1),
									})
								}
							/>
							<Select
								checkIconPosition="right"
								withAlignedLabels
								styles={{
									root: { height: "max-content" },
									wrapper: { height: "max-content" },
									input: {
										width: "12ch",
										height: "max-content",
										minHeight: "max-content",
										fontSize: font.size["1"],
										lineHeight: 1.5,
									},
									option: {
										width: "12ch",
									},
								}}
								data={[
									{
										label: `week${intervalUnitSuffix}`,
										value: "week",
									},
									{ label: `month${intervalUnitSuffix}`, value: "month" },
								]}
								value={recurrence.interval_unit}
								onChange={(value) => {
									updateRecurrence({
										type: "intervalUnit",
										value: value as IntervalUnit,
									});
								}}
							/>
						</Containers.Row>
						<div>
							{recurrence.interval_unit === INTERVAL_UNIT.WEEK ? (
								<DaySelector
									selection={recurrence.weekdays}
									setSelection={setSelection("weekdays")}
									resetSelection={resetSelection}
									options={daysOfWeek}
									optionLabels={daysOfWeek.map((d) => d[0])}
									// TODO: if a selection is present, render that as a
									// list, or a badge if the list is long
									triggerLabel={"pick days of week"}
								/>
							) : (
								<DaySelector
									selection={recurrence.monthdays}
									setSelection={setSelection("monthdays")}
									resetSelection={resetSelection}
									options={daysOfMonth}
									// TODO: if a selection is present, render that as a
									// list, or a badge if the list is long
									triggerLabel={"pick days of month"}
								/>
							)}
						</div>
					</S.Column>
				) : (
					/* interval (= "numeric" frequency) */
					<S.Column>
						{/* same style as previous case, need a shared component. */}
						<Containers.Row
							gap="small"
							style={{
								alignItems: "center",
								height: "1.5rem",
							}}
						>
							<span>every</span>
							<S.DaySelector.NumberInput
								type="number"
								step={1}
								min={1}
								value={recurrence.interval}
								onChange={(e) =>
									updateRecurrence({
										type: "interval",
										value: Math.max(+e.target.value, 1),
									})
								}
							/>
							<span>day{intervalUnitSuffix}</span>
						</Containers.Row>
					</S.Column>
				)}
			</Containers.Row>
		</S.Container>
	);
}
