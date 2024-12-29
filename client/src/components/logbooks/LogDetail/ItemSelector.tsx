import useMutateNewItem from "@/lib/hooks/query/logbooks/useMutateNewItem";
import { Unstyled } from "@/lib/theme/components/buttons";
import type { NewItem } from "@t/data/logbook.types";
import { type Item } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import { produce } from "immer";
import { LucidePlus } from "lucide-react";
import { useCallback, useState } from "react";
import S from "./style/ItemSelector.style";
import T from "./style/_shared.style";

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

	const { mutate } = useMutateNewItem();

	function handleNewItemChange(e: React.ChangeEvent<HTMLInputElement>) {
		setNewItem(
			produce((draft) => {
				draft.name = e.target.value;
			})
		);
	}

	function clearNewItemName() {
		setNewItem(
			produce((draft) => {
				draft.name = "";
			})
		);
	}

	const submitNewItem = useCallback(() => {
		// TODO: actually validate the new item; includes a check for uniqueness
		// of name among descendants from the given item template.
		const isValid = newItem.name.length > 0;
		if (isValid) {
			mutate({ newItem });
		}
	}, [newItem, mutate]);

	return (
		<S.Wrapper>
			{items.map((item) => (
				<T.SelectorButton
					onClick={() => onChange(item.item_id)}
					type="button"
					key={item.item_id}
				>
					{item.name}
				</T.SelectorButton>
			))}

			<T.SelectorNewButton>
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
							size={Math.max(newItem.name.length, 7)} // 7 looks good because of the length of the placeholder
							onChange={handleNewItemChange}
						/>
						<Unstyled
							type="button"
							onClick={() => {
								submitNewItem();
								clearNewItemName();
							}}
						>
							<LucidePlus size={15} />
						</Unstyled>
					</div>
				</label>
			</T.SelectorNewButton>
		</S.Wrapper>
	);
}
