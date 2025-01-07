import F from "@/components/activities/ActivityFilter/style/ActivityFilter.style";
import DayOfMonthSelector from "@/components/activities/ActivityForm/RecurrenceForm/DayOfMonthSelector";
import DayOfWeekSelector from "@/components/activities/ActivityForm/RecurrenceForm/DayOfWeekSelector";
import SharedStyle from "@/components/activities/ActivityForm/RecurrenceForm/style/shared.style";
import useRecurrenceForm, {
	frequencyOptions
} from "@/components/activities/ActivityForm/RecurrenceForm/useRecurrenceForm";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import type { NewRecurrenceInput } from "@shared/types/data/recurrence.types";

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

	return (
		<div style={{ margin: "0.5rem" }}>
			<label
				style={{
					display: "flex",
					flexDirection: "row",
					gap: "0.5rem"
				}}
			>
				<span>Activity is recurring?</span>
				<Checkbox checked={isRecurring} onChange={toggleRecurring} />
			</label>

			{isRecurring && (
				<>
					<div>When does this repeat?</div>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							padding: "1rem",
							gap: "1rem",
							maxWidth: "100%"
						}}
					>
						{/* First column */}
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								width: "max-content"
							}}
						>
							{frequencyOptions.map((frequency) => (
								<F.Label
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
								</F.Label>
							))}
						</div>

						{/* Second column */}
						{/* fixed date (= "calendar" frequency) */}
						{recurrence.frequency === "calendar" ? (
							<div style={{ display: "flex", flexDirection: "column" }}>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										gap: "0.5rem"
									}}
								>
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
								</div>
								{recurrence.interval_unit === "week" ? (
									<div>
										<DayOfWeekSelector />
									</div>
								) : (
									<div>
										<DayOfMonthSelector />
									</div>
								)}
							</div>
						) : (
							/* interval (= "numeric" frequency) */
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									height: "max-content",
									gap: "0.5rem"
								}}
							>
								<span>every</span>
								<SharedStyle.NumberInput
									value={recurrence.interval}
									onChange={(e) => setRecurrenceInterval(+e.target.value)}
								/>
								<span>day{intervalUnitSuffix}</span>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}
