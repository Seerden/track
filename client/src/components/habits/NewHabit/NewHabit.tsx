import TagSelector from "@/components/tags/TagSelector/TagSelector";
import { createDate } from "@/lib/datetime/make-date";
import modalIds from "@/lib/modal-ids";
import { CheckboxIcon } from "@/lib/theme/components/Checkbox";
import DefaultInput from "@/lib/theme/components/input/DefaultInput.style";
import F from "@lib/theme/components/form.style";
import { useState } from "react";
import { LuCalendarOff, LuCalendarPlus } from "react-icons/lu";
import S from "./style/NewHabit.style";
import useNewHabit from "./useNewHabit";

export default function NewHabit() {
	const [hasEndDate, setHasEndDate] = useState(false);
	const { habit, onInputChange, maybePlural, setHabit, onSubmit } = useNewHabit();

	return (
		<F.Wrapper>
			<F.FormTitle>Start a new habit</F.FormTitle>
			<F.Form onSubmit={onSubmit}>
				<F.Row>
					<F.Label>
						<span>Habit name</span>
						<DefaultInput
							type="text"
							onChange={onInputChange}
							name="name"
							required
						/>
					</F.Label>
					<F.Label>
						<span>Description</span>
						<DefaultInput type="text" onChange={onInputChange} name="description" />
					</F.Label>
				</F.Row>
				<F.CompactRow>
					I want to do this
					<input
						type="number"
						min={1}
						step={1}
						defaultValue={1}
						name="frequency"
						onChange={onInputChange}
					/>{" "}
					<S.FixedLengthString>time{habit.frequency > 1 && "s"}</S.FixedLengthString>{" "}
					every
					<input
						name="interval"
						onChange={onInputChange}
						min={1}
						step={1}
						defaultValue={1}
						type="number"
					/>{" "}
					<S.Select name="interval_unit" onChange={onInputChange}>
						{["day", "week", "month", "year"].map((unit) => (
							<option key={unit} value={unit}>
								{maybePlural(unit)}
							</option>
						))}
					</S.Select>
				</F.CompactRow>
				<S.ProgressionFieldset>
					<S.ProgressionTitle>
						How do you want to track your progress for this habit?
					</S.ProgressionTitle>
					<S.RadioField aria-label="Choose how to track your progress">
						<S.RadioOption>
							<S.RadioButton
								type="radio"
								name="goal_type"
								value="checkbox"
								checked={habit.goal_type === "checkbox"}
								onChange={(e) => {
									onInputChange(e);
									setHabit((current) => ({
										...current,
										goal: null,
										goal_unit: null
									}));
								}}
							/>
							<S.RadioLabelText>
								<CheckboxIcon checked={habit.goal_type === "checkbox"} />
								with a checkbox
							</S.RadioLabelText>
						</S.RadioOption>
						<S.RadioOption>
							<S.RadioButton
								type="radio"
								name="goal_type"
								checked={habit.goal_type === "goal"}
								value="goal"
								onChange={onInputChange}
							/>{" "}
							<S.RadioLabelText>
								<CheckboxIcon checked={habit.goal_type === "goal"} />
								with a detailed goal
							</S.RadioLabelText>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									gap: "0.5rem"
								}}
							>
								<S.Label>
									<span>target</span>
									<DefaultInput
										style={{
											width: "95px",
											fontSize: "0.82rem"
										}}
										type="number"
										name="goal"
										value={habit.goal ?? ""}
										onChange={onInputChange}
										placeholder="e.g. 10.000"
										disabled={habit.goal_type !== "goal"}
										required={habit.goal_type === "goal"}
									/>
								</S.Label>
								<S.Label>
									<span>unit</span>
									<DefaultInput
										style={{
											width: "75px",
											fontSize: "0.82rem"
										}}
										type="text"
										name="goal_unit"
										value={habit.goal_unit ?? ""}
										onChange={onInputChange}
										placeholder="e.g. steps"
										disabled={habit.goal_type !== "goal"}
										required={habit.goal_type === "goal"}
									/>
								</S.Label>
							</div>
						</S.RadioOption>
					</S.RadioField>
				</S.ProgressionFieldset>

				<F.Row
					style={{
						position: "relative",
						flexDirection: "column"
					}}
				>
					{hasEndDate && (
						<S.ClearEndDateButtonWrapper>
							<S.ClearEndDateButton
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									setHasEndDate(false);
									setHabit((current) => ({
										...current,
										end_timestamp: null
									}));
								}}
							>
								<LuCalendarOff size={15} fill={"orangered"} color="white" />
							</S.ClearEndDateButton>
						</S.ClearEndDateButtonWrapper>
					)}

					<S.DateFields>
						<F.Label>
							<span>Start date</span>
							<DefaultInput
								name="start_timestamp"
								type="date"
								value={createDate(habit.start_timestamp).format("YYYY-MM-DD")}
								onChange={onInputChange}
								required
							/>
						</F.Label>

						{hasEndDate ? (
							<F.Label>
								<span>End date</span>
								<DefaultInput
									type="date"
									name="end_timestamp"
									onChange={onInputChange}
									required
								/>
							</F.Label>
						) : (
							<S.SetEndDateButton
								onClick={(e) => {
									e.stopPropagation();
									setHasEndDate(true);
								}}
							>
								Add end date <LuCalendarPlus size={15} />
							</S.SetEndDateButton>
						)}
					</S.DateFields>
				</F.Row>

				<TagSelector
					modalId={modalIds.tagSelector.newHabit}
					showNewTagButton
					title="Add tags"
				/>

				<F.Button type="submit">Create habit</F.Button>
			</F.Form>
		</F.Wrapper>
	);
}
