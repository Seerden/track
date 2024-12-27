import type { Item } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";

type ItemSelectorProps = {
	items: Item[];
	onChange(item_id: ID): void;
};

// TODO: implement functionality. One part of this would be the new-item-button
// that is a typable input field + button combo that creates a new item and adds
// it right away
// TODO: styling
export default function ItemSelector({ items, onChange }: ItemSelectorProps) {
	return (
		<div>
			{items.map((item) => (
				<button
					onClick={() => onChange(item.item_id)}
					type="button"
					key={item.item_id}
				>
					{item.name}
				</button>
			))}
		</div>
	);
}
