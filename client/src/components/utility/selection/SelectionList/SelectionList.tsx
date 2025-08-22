import type { CSSProperties } from "react";
import { useState } from "react";
import Badge from "@/lib/theme/components/Badge";
import S from "./SelectionList.style";

export type ItemValue = string;

export type Item = {
	label: string;
	value: ItemValue;
};

type SelectionListProps = {
	multiple?: boolean;
	items: Item[];
	highlightColor?: CSSProperties["color"];
	onChange: (values: ItemValue[]) => void;
};

// TODO: because we're using Sets, the order of selection isn't preserved. We
// probably do want that, though.
export default function SelectionList({
	multiple = false,
	items,
	onChange,
	highlightColor = "limegreen",
}: SelectionListProps) {
	const [selection, setSelection] = useState<ItemValue[]>([]);

	function handleSelection({ value }: { value: ItemValue }) {
		let newValue: ItemValue[];

		if (multiple) {
			if (selection.includes(value)) {
				newValue = selection.filter((v) => v !== value);
				setSelection(newValue);
			} else {
				newValue = [...selection, value];
				setSelection(newValue);
			}
		} else {
			if (selection.includes(value)) {
				newValue = [] as ItemValue[];
				setSelection(newValue);
			} else {
				newValue = [value];
				setSelection([value]);
			}
		}

		onChange(newValue);
	}
	return (
		<S.List>
			{items.map((item) => (
				<div
					key={item.label}
					onClick={() => {
						handleSelection({ value: item.value });
					}}
					style={{
						cursor: "pointer",
					}}>
					<Badge
						color={selection.includes(item.value) ? highlightColor : "#ccc"}>
						{item.label}
					</Badge>
				</div>
			))}
		</S.List>
	);
}
