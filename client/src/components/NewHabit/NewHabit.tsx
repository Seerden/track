import TagSelector from "@/components/TagSelector/TagSelector";
import modalIds from "@/lib/modal-ids";
import DefaultInput from "@/lib/theme/components/input/DefaultInput.style";
import F from "@lib/theme/components/form.style";
import { useCallback, useState } from "react";
import { LuCalendarOff, LuCalendarPlus } from "react-icons/lu";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import S from "./style/NewHabit.style";

function Icon({ checked }: { checked: boolean }) {
	return checked ? (
		<MdCheckBox size={20} color={"forestgreen"} />
	) : (
		<MdCheckBoxOutlineBlank size={20} color="orange" />
	);
}

export default function NewHabit() {
	const [interval, setInterval] = useState(1);
	const [frequency, setFrequency] = useState(1);
	const [hasEndDate, setHasEndDate] = useState(false);
	const [progressionType, setProgressionType] = useState<"checkbox" | "goal">("goal");

	const maybePlural = useCallback(
		(s: string) => {
			return interval === 1 ? s : s + "s";
		},
		[interval]
	);

	const IconCheckbox =
		progressionType === "checkbox" ? MdCheckBox : MdCheckBoxOutlineBlank;
	const IconGoal = progressionType === "checkbox" ? MdCheckBoxOutlineBlank : MdCheckBox;

	return (
		<F.Wrapper>
			<F.FormTitle>Start a new habit</F.FormTitle>
			<F.Form onSubmit={() => {}}>
				<F.Row>
					<F.Label>
						<span>Habit name</span>
						<DefaultInput type="text" onChange={() => {}} name="name" required />
					</F.Label>
					<F.Label>
						<span>Description</span>
						<DefaultInput type="text" onChange={() => {}} name="description" />
					</F.Label>
				</F.Row>
				<F.CompactRow>
					I want to do this
					<input
						type="number"
						min={1}
						step={1}
						onChange={(e) => {
							setFrequency(+e.target.value);
						}}
					/>{" "}
					time{frequency > 1 && "s"} every
					<input
						onChange={(e) => {
							setInterval(+e.target.value);
						}}
						min={1}
						step={1}
						type="number"
					/>{" "}
					<select>
						<option value="day">{maybePlural("day")}</option>
						<option value="week">{maybePlural("week")}</option>
						<option value="month">{maybePlural("month")}</option>
						<option value="year">{maybePlural("year")}</option>
					</select>
				</F.CompactRow>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						backgroundColor: "#fff",
						borderRadius: "3px",
						boxShadow: "0 0 0.3rem 0 #aaa",
						outline: "2px solid white",
						padding: "1.2rem"
					}}
				>
					<div style={{ fontSize: "0.95rem", marginBottom: "0.4rem" }}>
						How do you want to track your progress for this habit?
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							gap: "1rem"
						}}
					>
						<S.RadioOption>
							<S.RadioButton
								type="radio"
								name="tracking"
								value="checkbox"
								onChange={(e) =>
									setProgressionType(e.target.value as "checkbox" | "goal")
								}
							/>
							<S.RadioLabelText>
								<Icon checked={progressionType === "checkbox"} />
								with a checkbox
							</S.RadioLabelText>
						</S.RadioOption>
						<S.RadioOption>
							<S.RadioButton
								type="radio"
								name="tracking"
								value="goal"
								onChange={(e) =>
									setProgressionType(e.target.value as "checkbox" | "goal")
								}
							/>{" "}
							<S.RadioLabelText>
								<Icon checked={progressionType === "goal"} />
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
										onChange={() => {}}
										name="target"
										placeholder="e.g. 10.000"
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
										onChange={() => {}}
										name="unit"
										placeholder="e.g. steps"
									/>
								</S.Label>
							</div>
						</S.RadioOption>
					</div>
				</div>

				<F.Row
					style={{
						position: "relative",
						flexDirection: "column"
					}}
				>
					{hasEndDate && (
						<label
							style={{
								position: "absolute",
								right: "0.1rem",
								top: "0.1rem"
							}}
						>
							<S.ClearEndDateButton
								type="button"
								onClick={() => setHasEndDate(false)}
							>
								<LuCalendarOff size={15} fill={"orangered"} color="white" />
							</S.ClearEndDateButton>
						</label>
					)}

					<div
						style={{
							display: "flex",
							flexDirection: "row",
							gap: "0.5rem",
							justifyContent: "space-between"
						}}
					>
						<F.Label
							style={{
								width: "calc(50% - 0.5rem)"
							}}
						>
							<span>Start date</span>
							<DefaultInput type="date" onChange={() => {}} required />
						</F.Label>
						{hasEndDate ? (
							<>
								<F.Label
									style={{
										width: "50%"
									}}
								>
									<span>End date</span>
									<DefaultInput type="date" onChange={() => {}} required />
								</F.Label>
							</>
						) : (
							<S.SetEndDateButton
								type="button"
								onClick={() => setHasEndDate(true)}
							>
								Add end date <LuCalendarPlus size={15} />
							</S.SetEndDateButton>
						)}
					</div>
				</F.Row>

				<TagSelector
					modalId={modalIds.tagSelector.newHabit}
					showNewTagButton
					title="Add tags"
				/>

				<F.Button>Create habit</F.Button>
			</F.Form>
		</F.Wrapper>
	);
}
