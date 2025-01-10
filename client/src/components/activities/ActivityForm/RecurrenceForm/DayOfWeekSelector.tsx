import day from "@/lib/dayjs";
import useFloatingProps from "@/lib/hooks/useFloatingProps";
import { FloatingArrow, FloatingFocusManager } from "@floating-ui/react";
import { produce } from "immer";
import { LucideXCircle } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import S from "./style/shared.style";

type DayOfWeekSelectorProps = {
	// TODO: could be Set<string> instead of string[]
	selection: string[];
	setSelection: Dispatch<SetStateAction<string[]>>;
};

export default function DayOfWeekSelector({
	selection,
	setSelection
}: DayOfWeekSelectorProps) {
	const [isOpen, setIsOpen] = useState(false);
	const float = useFloatingProps({
		click: {},
		open: isOpen,
		setOpen: setIsOpen
	});

	const weekdays = day.weekdays();
	const weekdayLabels = weekdays.map((day) => day[0]);

	// TODO: this handleClick + isActive logic is basically the same in
	// this and DayOfMonthSelector. We can extract it to a custom hook.
	// in fact, the components are sufficiently similar that we could
	// probably extract a generic selector component, and only provide the
	// list of options to it.
	function handleClick(day: string) {
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

	const isActive = (day: string) => selection.includes(day);

	function resetSelection() {
		setSelection([]);
	}

	return (
		<>
			<S.Trigger ref={float.refs.setReference} {...float.getReferenceProps()}>
				pick days of week
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
						<div style={{ display: "flex", flexDirection: "row" }}>
							{weekdays.map((label, index) => (
								<S.Cell
									key={label}
									$active={isActive(weekdays[index])}
									onClick={() => handleClick(weekdays[index])}
								>
									{weekdayLabels[index]}
								</S.Cell>
							))}
						</div>
					</S.FloatingWrapper>
				</FloatingFocusManager>
			)}
		</>
	);
}
