import MaybeItemRow from "@/components/logbooks/LogDetail/ItemRow";
import ItemSectionHeader from "@/components/logbooks/LogDetail/ItemSectionHeader";
import NewItemRow from "@/components/logbooks/LogDetail/NewItemRow";
import useItemSection from "@/components/logbooks/LogDetail/hooks/useItemSection";
import type { FieldTemplate, Item } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import S from "./style/ItemSection.style";

export type ItemSectionProps = {
	fieldTemplates: FieldTemplate[];
	item: Item;
	log_id: ID;
};

/** Renders a table of item rows for a single item for the specified log. */
export default function ItemSection({ fieldTemplates, item, log_id }: ItemSectionProps) {
	const { isProbablySuspended, itemRows } = useItemSection({
		item_id: item.item_id,
		log_id
	});

	if (isProbablySuspended) return null;

	const labels = fieldTemplates.map((template) => template.name);

	return (
		<S.Wrapper>
			<S.ItemName>{item.name}</S.ItemName>
			<S.Table>
				<S.TableContent $columns={labels.length}>
					<ItemSectionHeader labels={labels} />
					{itemRows.map(({ item_row_id }, index) => (
						<MaybeItemRow key={index} item_row_id={item_row_id} />
					))}
					<NewItemRow
						log_id={log_id}
						key={itemRows.length + 1}
						position={itemRows.length + 1}
						item={item}
						fieldTemplates={fieldTemplates}
					/>
				</S.TableContent>
			</S.Table>
		</S.Wrapper>
	);
}
