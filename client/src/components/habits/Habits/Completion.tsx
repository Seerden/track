import { offset } from "@floating-ui/react";
import type {
	HabitEntry,
	HabitWithPossiblySyntheticEntries,
	PossiblySyntheticHabitEntry,
	SyntheticHabitEntry,
} from "@shared/lib/schemas/habit";
import { useState } from "react";
import CompletionBadge from "@/components/habits/Habits/CompletionBadge";
import CompletionInstance from "@/components/habits/Habits/CompletionInstance";
import useFloatingProps from "@/lib/hooks/useFloatingProps";
import S from "./style/Completion.style";

type CompletionInstancesProps = {
	entries: PossiblySyntheticHabitEntry[];
	habit: HabitWithPossiblySyntheticEntries;
	shouldShowBadge: boolean;
};

function CompletionInstances({
	entries,
	habit,
	shouldShowBadge,
}: CompletionInstancesProps) {
	return (
		<>
			{entries
				.sort((a, b) => a.index - b.index) // Consider sorting at data-fetch time instead
				.map((entry) => (
					<CompletionInstance
						key={`${entry.created_at}-${entry.index}`}
						entry={entry}
						habit={habit}
						sliderWidth={shouldShowBadge ? "50px" : "100px"}
					/>
				))}
		</>
	);
}

type CompletionProps = {
	habit: HabitWithPossiblySyntheticEntries;
	entries: Array<HabitEntry | SyntheticHabitEntry>;
	/** Expected real entry count (e.g. if 3x/day, this would be 3. We use this
	 * prop to determine the percentage for e.g. circular progression, because we
	 * can keep adding entries indefinitely, but beyond this `count`, the new
	 * entries shouldn't expand the circular progress bar). */
	count?: number;
};

export default function Completion({ habit, entries, count }: CompletionProps) {
	const [isOpen, setIsOpen] = useState(false);

	const itemCount = entries.length;
	// TODO: does this always prevent overflow issues? Maybe make fine-tune the logic a little more.
	const shouldShowBadge = itemCount > 3;

	const float = useFloatingProps({
		click: {},
		open: isOpen,
		offset: offset(10),
		setOpen: setIsOpen,
	});

	const completionInstanceProps = {
		entries,
		habit,
		shouldShowBadge,
	};

	if (!shouldShowBadge) {
		return (
			<S.List $itemCount={itemCount}>
				<CompletionInstances {...completionInstanceProps} />
			</S.List>
		);
	}

	return (
		<S.List $itemCount={itemCount}>
			<div ref={float.refs.setReference} {...float.getReferenceProps()}>
				<CompletionBadge
					habit={habit}
					entries={entries}
					count={count ?? entries.length}
				/>
			</div>
			{isOpen && (
				<S.FloatingWrapper
					ref={float.refs.setFloating}
					style={{ ...float.floatingStyles }}
					{...float.getFloatingProps()}
				>
					<CompletionInstances {...completionInstanceProps} />
				</S.FloatingWrapper>
			)}
		</S.List>
	);
}
