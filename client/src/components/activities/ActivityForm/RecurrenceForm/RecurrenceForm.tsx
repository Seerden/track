import F from "@/components/activities/ActivityFilter/style/ActivityFilter.style";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import type { NewRecurrenceInput } from "@shared/types/data/recurrence.types";
import { useState } from "react";

const defaultRecurrence: NewRecurrenceInput["newRecurrence"] = {
	start_timestamp: new Date().toISOString(),
	interval: 1,
	interval_unit: "day",
	frequency: "numeric",
	end_timestamp: null
};

export default function RecurrenceForm() {
	const [isRecurring, setIsRecurring] = useState(false);
	const [recurrence, setRecurrence] =
		useState<NewRecurrenceInput["newRecurrence"]>(defaultRecurrence);

	return (
		<div>
			<label
				style={{
					display: "flex",
					flexDirection: "row",
					gap: "0.5rem"
				}}
			>
				<span>Activity is recurring?</span>
				<Checkbox
					checked={isRecurring}
					onChange={() => setIsRecurring((current) => !current)}
				/>
			</label>

			{isRecurring && (
				<>
					<div>When does this repeat?</div>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							margin: "1rem",
							padding: "1rem",
							outline: "2px solid orangered",
							gap: "0.5rem",
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
							{["calendar", "numeric"].map((radioOption) => (
								<F.Label
									key={radioOption}
									$active={recurrence.frequency === radioOption}
								>
									<input
										style={{ width: 0 }}
										type="radio"
										name="frequency"
										value={radioOption}
										onChange={() =>
											setRecurrence((current) => ({
												...current,
												frequency:
													radioOption as NewRecurrenceInput["newRecurrence"]["frequency"]
											}))
										}
									/>
									<span>
										{radioOption === "calendar" ? "fixed date" : "interval"}
									</span>
								</F.Label>
							))}
						</div>

						{/* Second column */}
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								width: "max-content"
							}}
						>
							{["week", "month"].map((radioOption) => (
								<F.Label
									key={radioOption}
									$active={recurrence.interval_unit === radioOption}
								>
									<input
										style={{ width: 0 }}
										type="radio"
										name="interval_unit"
										value={radioOption}
										onChange={() =>
											setRecurrence((current) => ({
												...current,
												interval_unit:
													radioOption as NewRecurrenceInput["newRecurrence"]["interval_unit"]
											}))
										}
									/>
									<span>{radioOption}</span>
								</F.Label>
							))}
						</div>

						{/* Third column */}
						{/* fixed date (= "calendar" frequency) */}
						{recurrence.frequency === "calendar" ? (
							<div style={{ display: "flex", flexDirection: "column" }}>
								<div style={{ display: "flex", flexDirection: "row" }}>
									<span>every</span>
									<input
										style={{ width: "50px", height: "max-content" }}
										type="number"
										min={1}
										step={1}
										value={recurrence.interval}
										onChange={(e) =>
											setRecurrence((current) => ({
												...current,
												interval: Number(e.target.value)
											}))
										}
									/>
									<span>
										{recurrence.interval_unit}
										{recurrence.interval > 1 ? "s" : ""}
									</span>
								</div>
								{recurrence.interval_unit === "week" ? (
									<div>... day of week selector goes here</div>
								) : (
									<div>
										... day of month selector goes here
										<DayOfMonthSelector />
									</div>
								)}
							</div>
						) : (
							/* interval (= "numeric" frequency) */
							<div>hey</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}

function DayOfMonthSelector() {
	// Cells for 31 days of the month. 1 row per 7 days.
	const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1).reduce((acc, day) => {
		if (!((day - 1) % 7)) {
			acc.push([day]);
		} else {
			acc.at(-1)?.push(day);
		}
		return acc;
	}, [] as number[][]);

	return (
		<>
			{/* FLOATING TRIGGER */}
			<button type="button">select days</button>

			{/* THIS IS THE FLOATING PART */}
			{/* TODO: 
            - implement each cell as a button
            - pass handler to each button */}
			<div>
				{daysOfMonth.map((week, i) => (
					<div key={i} style={{ display: "flex", flexDirection: "row" }}>
						{week.map((day) => (
							<div style={{ width: 25, height: 25 }} key={day}>
								{day}
							</div>
						))}
					</div>
				))}
			</div>
		</>
	);
}
