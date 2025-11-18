import { Popover } from "@mantine/core";
import { LucideXCircle } from "lucide-react";
import { usePopover } from "@/lib/hooks/usePopover";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
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
	selection: T[] | null;
	/** State setter passed to this by RecurrenceForm. */
	setSelection: (value: T) => void;
	resetSelection: () => void;
	/** The text to display on the floating trigger button. */
	triggerLabel: string;
} & DaySelectorOptionsBase<T>;

/** Type guard to distinguish between daysOfWeek and daysOfMonth. */
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
	optionLabels,
}: DaySelectorProps<T>) {
	const { opened, open, close, toggle } = usePopover("ActivityForm");

	const isActive = (day: T) => selection?.includes(day);

	return (
		<Popover
			trapFocus
			opened={opened("DaySelector")}
			onOpen={() => open("DaySelector")}
			onClose={() => close("DaySelector")}
			onDismiss={() => close("DaySelector")}
			closeOnEscape={false}
			radius={"sm"}
			withArrow
			styles={{
				dropdown: {
					padding: 0,
					margin: 0,
				},
			}}
		>
			<Popover.Target>
				<S.Trigger type="button" onClick={() => toggle("DaySelector")}>
					{triggerLabel}
				</S.Trigger>
			</Popover.Target>

			<Popover.Dropdown>
				<S.FloatingWrapper>
					<S.ActionBar>
						<Buttons.Action.Clear
							type="button"
							disabled={!selection?.length}
							title="Clear selection"
							onClick={resetSelection}
						>
							<LucideXCircle size={18} strokeWidth={2} />
						</Buttons.Action.Clear>
					</S.ActionBar>
					{isNestedArray(options) ? (
						<>
							{options.map((week, index) => (
								<Containers.Row key={index}>
									{week.map((day) => (
										<Buttons.Cell.DaySelector
											$active={isActive(day)}
											onClick={() => setSelection(day)}
											key={day}
										>
											{day}
										</Buttons.Cell.DaySelector>
									))}
								</Containers.Row>
							))}
						</>
					) : (
						<Containers.Row>
							{options.map((option, index) => (
								<Buttons.Cell.DaySelector
									key={option}
									$active={isActive(option)}
									onClick={() => setSelection(option)}
								>
									{optionLabels?.[index] ?? option}
								</Buttons.Cell.DaySelector>
							))}
						</Containers.Row>
					)}
				</S.FloatingWrapper>
			</Popover.Dropdown>
		</Popover>
	);
}
