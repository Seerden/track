import MaybeItemRow from "@/components/logbooks/LogDetail/ItemRow";
import ItemSectionHeader from "@/components/logbooks/LogDetail/ItemSectionHeader";
import NewItemRow from "@/components/logbooks/LogDetail/NewItemRow";
import useItemSection from "@/components/logbooks/LogDetail/hooks/useItemSection";
import type { Item, ItemRow } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import S from "./style/ItemSection.style";

export type ItemSectionProps = {
	rows: ItemRow[];
	item: Item;
	log_id: ID;
};

/** Renders a table of item rows for a single item for the specified log. */
export default function ItemSection({ rows, item, log_id }: ItemSectionProps) {
	const { isProbablySuspended, fieldsForItem } = useItemSection({ item });

	if (isProbablySuspended) return null;

	// const labels = fieldTemplates.map(template => template.name) // TODO(TRK-182)
	const labels = fieldsForItem.map((field) => field.name);

	return (
		<S.Wrapper>
			<S.ItemName>{item.name}</S.ItemName>
			<S.Table>
				<S.TableContent $columns={labels.length}>
					<ItemSectionHeader labels={labels} />
					{rows.map(({ item_row_id }, index) => (
						<MaybeItemRow
							key={index}
							fields={fieldsForItem}
							item_row_id={item_row_id}
						/>
					))}
					<NewItemRow
						log_id={log_id}
						key={rows.length + 1}
						position={rows.length + 1}
						item={item}
						fieldTemplates={fieldsForItem}
					/>
				</S.TableContent>
			</S.Table>
		</S.Wrapper>
	);
}
