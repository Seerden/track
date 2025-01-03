import useItemSelector from "@/components/logbooks/LogDetail/hooks/useItemSelector";
import { Unstyled } from "@/lib/theme/components/buttons";
import { type Item } from "@shared/types/data/logbook.types";
import type { ID } from "@shared/types/data/utility.types";
import { LucidePlus } from "lucide-react";
import S from "./style/ItemSelector.style";
import T from "./style/_shared.style";

type ItemSelectorProps = {
	item_template_id: ID;
	logbook_id: ID;
	items: Item[];
	onChange(item_id: ID): void;
};

export default function ItemSelector({
	item_template_id,
	logbook_id,
	items,
	onChange
}: ItemSelectorProps) {
	const { newItem, handleNewItemChange, handleNewButtonClick } = useItemSelector({
		item_template_id,
		logbook_id
	});

	return (
		<T.SelectorWrapper>
			<S.Items>
				{items.map((item) => (
					<T.SelectorButton
						key={item.item_id}
						onClick={() => onChange(item.item_id)}
					>
						{item.name}
					</T.SelectorButton>
				))}
			</S.Items>

			<T.SelectorNewButton>
				<input
					type="text"
					placeholder="new"
					value={newItem.name}
					size={Math.max(newItem.name.length, 7)} // 7 looks good because of the length of the placeholder
					onChange={handleNewItemChange}
				/>
				<Unstyled type="button" onClick={handleNewButtonClick}>
					<LucidePlus size={15} />
				</Unstyled>
			</T.SelectorNewButton>
		</T.SelectorWrapper>
	);
}
