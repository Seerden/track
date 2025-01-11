import useFloatingProps from "@/lib/hooks/useFloatingProps";
import Containers from "@/lib/theme/components/container.style";
import { FloatingArrow, FloatingFocusManager } from "@floating-ui/react";
import { LucideXCircle } from "lucide-react";
import { useState } from "react";
import S from "./style/DaySelector.style";

/** Either e.g. "monday" or in domain [1,31]. */
type Option = string | number;

type DaySelectorOptionsBase<T extends Option> =
	| {
			/** The options to display. */
			options: T[];
			/** The labels to display for each option
			 * @note we can't use the labels as options, because e.g. S(aturday)
			 * and S(unday) have the same label, but they need different keys and
			 * values in the `selection` state.
			 */
			optionLabels: string[];
	  }
	| {
			options: T[][];
			optionLabels?: undefined;
	  };

type DaySelectorProps<T extends Option> = {
	/** State passed to this by RecurrenceForm. */
	selection: T[];
	/** State setter passed to this by RecurrenceForm. */
	setSelection: (value: T) => void;
	resetSelection: () => void;
	/** The text to display on the floating trigger button. */
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
	resetSelection,
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

	const isActive = (day: T) => selection.includes(day);

	if (!isOpen) {
		return (
			<S.Trigger ref={float.refs.setReference} {...float.getReferenceProps()}>
				{triggerLabel}
			</S.Trigger>
		);
	}

	return (
		<>
			<S.Trigger ref={float.refs.setReference} {...float.getReferenceProps()}>
				{triggerLabel}
			</S.Trigger>

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
						width={15}
						height={5}
						fill={"#ccc"}
						style={{
							marginBottom: "1px"
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
							{options.map((week, index) => (
								<Containers.Utility.FlexRow key={index}>
									{week.map((day) => (
										<S.Cell
											$active={isActive(day)}
											onClick={() => setSelection(day)}
											key={day}
										>
											{day}
										</S.Cell>
									))}
								</Containers.Utility.FlexRow>
							))}
						</>
					) : (
						<Containers.Utility.FlexRow>
							{options.map((option, index) => (
								<S.Cell
									key={option}
									$active={isActive(option)}
									onClick={() => setSelection(option)}
								>
									{optionLabels?.[index] ?? option}
								</S.Cell>
							))}
						</Containers.Utility.FlexRow>
					)}
				</S.FloatingWrapper>
			</FloatingFocusManager>
		</>
	);
}
