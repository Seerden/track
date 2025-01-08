import CompletionBadge from "@/components/habits/Habits/CompletionBadge";
import CompletionInstance from "@/components/habits/Habits/CompletionInstance";
import useFloatingProps from "@/lib/hooks/useFloatingProps";
import { offset } from "@floating-ui/react";
import type {
	HabitEntry,
	HabitWithIds,
	SyntheticHabitEntry
} from "@shared/types/data/habit.types";
import { useCallback, useState } from "react";
import S from "./style/Completion.style";

type CompletionProps = {
	habit: HabitWithIds;
	entries: Array<HabitEntry | SyntheticHabitEntry>;
};

export default function Completion({ habit, entries }: CompletionProps) {
	const itemCount = entries.length;
	const shouldShowBadge = itemCount > 3;
	const [isOpen, setIsOpen] = useState(false);

	const renderEntries = useCallback(() => {
		return entries
			.sort((a, b) => a.index - b.index) // should this not be done at the moment of creation?
			.map((entry) => (
				<CompletionInstance
					// TODO: figure this out ⬇️
					// note that index is not unique even for the same habit. index
					// is just the order on a given day. the actual displayed order
					// should not be by index, but by created_at.
					// TODO: actually, do we need `index` at all?
					key={`${entry.created_at}-${entry.index}`}
					entry={entry}
					habit={habit}
					width={shouldShowBadge ? "50px" : "100px"}
					alwaysShowLabelText={!shouldShowBadge}
				/>
			));
	}, [entries, shouldShowBadge]);

	const float = useFloatingProps({
		click: {},
		open: isOpen,
		offset: offset(10),
		setOpen: setIsOpen
	});

	const floatingProps = {
		ref: float.refs.setFloating,
		style: {
			...float.floatingStyles
		},
		...float.getFloatingProps()
	};

	return (
		<S.List $itemCount={itemCount}>
			{shouldShowBadge ? (
				<>
					<div ref={float.refs.setReference} {...float.getReferenceProps()}>
						<CompletionBadge habit={habit} entries={entries} />
					</div>
					{isOpen && (
						<S.FloatingWrapper {...floatingProps}>
							{renderEntries()}
						</S.FloatingWrapper>
					)}
				</>
			) : (
				<>{renderEntries()}</>
			)}
		</S.List>
	);
}
