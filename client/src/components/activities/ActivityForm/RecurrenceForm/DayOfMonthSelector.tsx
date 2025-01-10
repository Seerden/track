/*
   TODO
   - by default, select the start date of the activity
   - if the activity is multiday, there has to be a gap between possible
     selected days at least equal to the length of the activity in days.
*/

import useFloatingProps from "@/lib/hooks/useFloatingProps";
import { FloatingArrow, FloatingFocusManager } from "@floating-ui/react";
import { produce } from "immer";
import { LucideXCircle } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import S from "./style/shared.style";

type DayOfMonthSelectorProps = {
	selection: number[];
	setSelection: Dispatch<SetStateAction<number[]>>;
};

export default function DayOfMonthSelector({
	selection,
	setSelection
}: DayOfMonthSelectorProps) {
	const [isOpen, setIsOpen] = useState(false);

	const float = useFloatingProps({
		click: {},
		open: isOpen,
		setOpen: setIsOpen
	});

	// Cells for 31 days of the month. 1 row per 7 days.
	const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1).reduce((acc, day) => {
		if (!((day - 1) % 7)) {
			acc.push([day]);
		} else {
			acc.at(-1)?.push(day);
		}
		return acc;
	}, [] as number[][]);

	const isActive = (day: number) => selection.includes(day);

	function handleClick(day: number) {
		setSelection(
			produce((draft) => {
				if (draft.includes(day)) {
					draft.splice(draft.indexOf(day), 1);
				} else {
					draft.push(day);
				}
			})
		);
	}

	function resetSelection() {
		setSelection([]);
	}

	return (
		<>
			<S.Trigger ref={float.refs.setReference} {...float.getReferenceProps()}>
				pick days of month
			</S.Trigger>

			{/* TODO: 
            - implement each cell as a button
            - pass handler to each button */}
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
								marginBottom: "2px" // matches the width of the outline/border
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
						{daysOfMonth.map((week, i) => (
							<div key={i} style={{ display: "flex", flexDirection: "row" }}>
								{week.map((day) => (
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
					</S.FloatingWrapper>
				</FloatingFocusManager>
			)}
		</>
	);
}
