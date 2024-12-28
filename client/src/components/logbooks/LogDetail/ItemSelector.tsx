import { Unstyled } from "@/lib/theme/components/buttons";
import type { NewItem } from "@t/data/logbook.types";
import { type Item } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import { produce } from "immer";
import { LucidePlus } from "lucide-react";
import { useState } from "react";
import S from "./style/ItemSelector.style";

type ItemSelectorProps = {
	items: Item[];
	onChange(item_id: ID): void;
	item_template_id: ID;
	logbook_id: ID;
};

// TODO: implement functionality. One part of this would be the new-item-button
// that is a typable input field + button combo that creates a new item and adds
// it right away
// TODO: styling
export default function ItemSelector({
	items,
	onChange,
	item_template_id,
	logbook_id
}: ItemSelectorProps) {
	const [newItem, setNewItem] = useState<NewItem>({
		name: "",
		item_template_id,
		logbook_id
	});

	function handleNewItemChange(e: React.ChangeEvent<HTMLInputElement>) {
		setNewItem(
			produce((draft) => {
				draft.name = e.target.value;
			})
		);
	}

	return (
		<S.Wrapper>
			{items.map((item) => (
				<S.ItemButton
					onClick={() => onChange(item.item_id)}
					type="button"
					key={item.item_id}
				>
					{item.name}
				</S.ItemButton>
			))}

			<S.NewItemButton>
				<label style={{ display: "flex", flexDirection: "column" }}>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							height: "max-content"
						}}
					>
						<input
							type="text"
							placeholder="new item"
							value={newItem.name}
							size={Math.max(newItem.name.length, 7)}
							onChange={handleNewItemChange}
						/>
						<Unstyled type="button">
							<LucidePlus size={15} />
						</Unstyled>
					</div>
				</label>
			</S.NewItemButton>
		</S.Wrapper>
	);
}
