import useFloatingProps from "@/lib/hooks/useFloatingProps";
import { FloatingArrow, FloatingFocusManager } from "@floating-ui/react";
import { produce } from "immer";
import { LucideXCircle } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import S from "./style/shared.style";

// TODO: this replaCES the DayOfWeekSelector and DayOfMonthSelector components
// do some checking to enforce typing and shapes of stuff

type DaySelectorProps = {
	selection: (string | number)[];
	setSelection: Dispatch<SetStateAction<string[]>> | Dispatch<SetStateAction<number[]>>;
	triggerLabel: string;
	options: (string | number)[] | (string | number)[][];
	optionLabels?: string[];
};

export default function DaySelector({
	selection,
	setSelection,
	triggerLabel,
	options,
	optionLabels
}: DaySelectorProps) {
	const [isOpen, setIsOpen] = useState(false);
	const float = useFloatingProps({
		click: {},
		open: isOpen,
		setOpen: setIsOpen
	});

	// TODO: type the thing so that the function accepts selection of either
	// string[] or number[]
	function handleClick(day: any) {
		setSelection(
			produce((draft: string[]) => {
				if (draft.includes(day)) {
					draft.splice(draft.indexOf(day), 1);
				} else {
					draft.push(day);
				}
			})
		);
	}

	const isActive = (day: string | number) => selection.includes(day);

	function resetSelection() {
		setSelection([]);
	}

	return (
		<>
			<S.Trigger ref={float.refs.setReference} {...float.getReferenceProps()}>
				{triggerLabel}
			</S.Trigger>

			{isOpen && (
				<FloatingFocusManager context={float.context}>
					<S.FloatingWrapper
						ref={float.refs.setFloating}
						style={{
							...float.floatingStyles
						}}
						{...float.getFloatingProps()}
					>
						<FloatingArrow
							ref={float.arrowRef}
							context={float.context}
							fill="#ccc"
							width={15}
							height={5}
							style={{
								marginBottom: "2px"
							}}
						/>
						<S.ActionBar>
							<S.ClearButton
								disabled={selection.length === 0}
								title="Clear selection"
								onClick={resetSelection}
							>
								<LucideXCircle size={20} strokeWidth={2} />
							</S.ClearButton>
						</S.ActionBar>
						<>
							{/* OPTIONS -- either nested arrays, or single-depth array */}
							{Array.isArray(options[0]) ? (
								<>
									{options.map((week, i) => (
										<div
											key={i}
											style={{ display: "flex", flexDirection: "row" }}
										>
											{(week as string[] | number[]).map((day) => (
												<S.Cell
													$active={isActive(day)}
													onClick={() => handleClick(day)}
													key={day}
												>
													{day}
												</S.Cell>
											))}
										</div>
									))}
								</>
							) : (
								<div style={{ display: "flex", flexDirection: "row" }}>
									{(options as string[] | number[]).map((option, index) => (
										<S.Cell
											key={option}
											$active={isActive(option)}
											onClick={() => handleClick(option)}
										>
											{optionLabels?.[index] ?? option}
										</S.Cell>
									))}
								</div>
							)}
						</>
					</S.FloatingWrapper>
				</FloatingFocusManager>
			)}
		</>
	);
}
