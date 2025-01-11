import useFloatingProps from "@/lib/hooks/useFloatingProps";
import { FloatingArrow, FloatingFocusManager } from "@floating-ui/react";
import { produce } from "immer";
import { LucideXCircle } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import S from "./style/shared.style";

type Option = string | number;

type DaySelectorOptionsBase<T extends Option> =
	| {
			options: T[];
			optionLabels: string[];
	  }
	| {
			options: T[][];
			optionLabels?: undefined;
	  };

type DaySelectorProps<T extends Option> = {
	selection: T[];
	setSelection: Dispatch<SetStateAction<T[]>>;
	triggerLabel: string;
} & DaySelectorOptionsBase<T>;

/** Type guard for  */
function isNestedArray<TOption>(
	options: TOption[] | TOption[][]
): options is TOption[][] {
	return options.every(Array.isArray);
}

/** This component handles two types of day selector for RecurrenceForm. Either
 * daysOfWeek, or daysOfMonth. In the case of daysOfMonth, `options` is` a
 * nested array, each entry containing up to 7 days. In the case of daysOfWeek,
 * a flat array is passed as `options`. */
export default function DaySelector<T extends Option>({
	selection,
	setSelection,
	triggerLabel,
	options,
	optionLabels
}: DaySelectorProps<T>) {
	const [isOpen, setIsOpen] = useState(false);
	const float = useFloatingProps({
		click: {},
		open: isOpen,
		setOpen: setIsOpen
	});

	function handleClick(day: T) {
		setSelection(
			produce((_draft) => {
				const draft = _draft as T[];
				if (draft.includes(day)) {
					draft.splice(draft.indexOf(day), 1);
				} else {
					draft.push(day);
				}
			})
		);
	}

	const isActive = (day: T) => selection.includes(day);

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
						{isNestedArray(options) ? (
							<>
								{options.map((week, i) => (
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
							</>
						) : (
							<div style={{ display: "flex", flexDirection: "row" }}>
								{options.map((option, index) => (
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
					</S.FloatingWrapper>
				</FloatingFocusManager>
			)}
		</>
	);
}
