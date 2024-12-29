import useItemSelector from "@/components/logbooks/LogDetail/hooks/useItemSelector";
import { Unstyled } from "@/lib/theme/components/buttons";
import { type Item } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import { LucidePlus } from "lucide-react";
import S from "./style/ItemSelector.style";
import T from "./style/_shared.style";

type ItemSelectorProps = {
	items: Item[];
	onChange(item_id: ID): void;
	item_template_id: ID;
	logbook_id: ID;
};

// TODO: styling
export default function ItemSelector({
	items,
	onChange,
	item_template_id,
	logbook_id
}: ItemSelectorProps) {
	const { newItem, handleNewItemChange, handleNewButtonClick } = useItemSelector({
		item_template_id,
		logbook_id
	});

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
				<input
					type="text"
					placeholder="new item"
					value={newItem.name}
					size={Math.max(newItem.name.length, 7)} // 7 looks good because of the length of the placeholder
					onChange={handleNewItemChange}
				/>
				<Unstyled type="button" onClick={handleNewButtonClick}>
					<LucidePlus size={15} />
				</Unstyled>
			</T.SelectorNewButton>
		</S.Wrapper>
	);
}
