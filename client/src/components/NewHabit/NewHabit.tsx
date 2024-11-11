import DefaultInput from "@/lib/theme/components/input/DefaultInput.style";
import F from "@lib/theme/components/form.style";
import { useCallback, useState } from "react";
import { MdFilterListOff } from "react-icons/md";
import S from "./style/NewHabit.style";

export default function NewHabit() {
	const [interval, setInterval] = useState(1);
	const [frequency, setFrequency] = useState(1);
	const [hasEndDate, setHasEndDate] = useState(false);

	const maybePlural = useCallback(
		(s: string) => {
			return interval === 1 ? s : s + "s";
		},
		[interval]
	);

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
						<option>{maybePlural("day")}</option>
						<option>{maybePlural("week")}</option>
						<option>{maybePlural("month")}</option>
						<option>{maybePlural("year")}</option>
					</select>
				</F.CompactRow>
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
								right: "0.5rem",
								top: "0.5rem"
							}}
						>
							<S.ClearEndDateButton
								type="button"
								onClick={() => setHasEndDate(false)}
							>
								<MdFilterListOff size={15} fill={"white"} />
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
								Set end date
							</S.SetEndDateButton>
						)}
					</div>
				</F.Row>
				<F.Button>Create habit</F.Button>
			</F.Form>
		</F.Wrapper>
	);
}
