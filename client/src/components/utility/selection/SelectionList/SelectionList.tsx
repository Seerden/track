import Badge from "@/lib/theme/components/Badge";
import { useReducer } from "react";
import type { CSS } from "styled-components/dist/types";
import S from "./SelectionList.style";

type ItemValue = string | number;

type Item = {
	label: string;
	value: ItemValue;
};

type SelectionListProps = {
	multiple?: boolean;
	items: Item[];
	highlightColor?: CSS.Properties["color"];
	onChange: (values: (string | number)[]) => void;
};

// TODO: because we're using Sets, the order of selection isn't preserved. We
// probably do want that, though.
export default function SelectionList({
	multiple,
	items,
	onChange,
	highlightColor = "limegreen"
}: SelectionListProps) {
	function selectionReducer(selection: ItemValue[], action: { value: ItemValue }) {
		const valuesSet = new Set(selection);

		if (multiple) {
			if (valuesSet.has(action.value)) {
				valuesSet.delete(action.value);
			} else {
				valuesSet.add(action.value);
			}
		} else {
			if (valuesSet.has(action.value)) {
				valuesSet.clear();
			} else {
				valuesSet.clear();
				valuesSet.add(action.value);
			}
		}

		const newSelection = Array.from(valuesSet);
		onChange(newSelection);
		return newSelection;
	}

	const [selection, dispatch] = useReducer(selectionReducer, []);

	return (
		<S.List>
			{items.map((item) => (
				<div
					key={item.label}
					onClick={() => dispatch({ value: item.value })}
					style={{
						cursor: "pointer"
					}}
				>
					<Badge color={selection.includes(item.value) ? highlightColor : "#ccc"}>
						{`${item.value}`}
					</Badge>
				</div>
			))}
		</S.List>
	);
}
