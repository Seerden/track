import useItemSection from "@/components/logbooks/LogDetail/hooks/useItemSection";
import ItemRowsTable from "@/components/logbooks/LogDetail/ItemRowsTable";
import { getRowsForItem } from "@/components/logbooks/LogDetail/lib/get-rows";
import NewItem from "@/components/logbooks/NewItem/NewItem";
import Modal from "@/components/utility/Modal/Modal";
import { useQueryItemsByItemTemplate } from "@/lib/hooks/query/logbooks/useQueryItems";
import useQueryLogs from "@/lib/hooks/query/logbooks/useQueryLogs";
import { useQueryLogTemplatesByLogbook } from "@/lib/hooks/query/logbooks/useQueryLogTemplates";
import type { ItemTemplate } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import { useMemo, useState } from "react";
import S from "./style/ItemSection.style";

export type ItemSectionProps = {
	itemTemplate: ItemTemplate;
	log_id: ID;
	logbook_id: ID;
};

export default function ItemSection({
	itemTemplate,
	log_id,
	logbook_id
}: ItemSectionProps) {
	const { isProbablySuspended, modalId, handleModalOpen, itemRows } = useItemSection({
		itemTemplate,
		log_id
	});

	const { data: itemsData } = useQueryItemsByItemTemplate(itemTemplate.item_template_id);
	const { data: logTemplatesData } = useQueryLogTemplatesByLogbook(logbook_id);
	const { data: logsData } = useQueryLogs();

	const itemsById = itemsData?.byId;
	const items = itemsById ? Object.values(itemsById) : [];
	const log = logsData?.byId[log_id];
	const logTemplate = log?.log_template_id
		? logTemplatesData?.byId[log.log_template_id]
		: null;

	const layout = logTemplate?.layout;
	const [manuallySelectedItemIds, setManuallySelectedItemIds] = useState<ID[]>([]);

	const selectedItemIds = useMemo(() => {
		// TODO: this should be done at a higher level in the component tree.
		// Determine which sections (and which items) to render before we even get
		// to this ItemSection component.
		return items
			.map((item) => +item.item_id)
			.filter((id) => {
				// return true if the item is in the log's log_template.layout
				// TODO: change this logic once we definitively change the shape of
				// logTemplate.layout.
				if (layout?.flat().includes(+id)) return true;

				// return true if there is at least 1 item row for this item in the log (=
				// in `itemRows`)
				if (itemRows?.some((row) => +row.item_id === +id)) return true;

				// return true if the user manually selected the item to be in the log
				// using the not-yet-implemented button
				return manuallySelectedItemIds.includes(+id);
			});
	}, [items, layout, itemRows, manuallySelectedItemIds]);

	// TODO: here, filter out any items that are neither in the log's
	// log_template, nor have item rows associated with them for this log.
	const filteredItems = items.filter((item) => selectedItemIds.includes(+item.item_id));

	const notYetSelectedItems = items.filter(
		(item) => !selectedItemIds.includes(+item.item_id)
	);
	const [selectedOption, setSelectedOption] = useState<ID>(
		+notYetSelectedItems[0]?.item_id
	);

	if (isProbablySuspended) return null;

	return (
		<>
			<S.Wrapper>
				<S.Header>{itemTemplate.name}</S.Header>
				{!!items && items.length === 0 && (
					// TODO: implement the button to add a new item here
					<div>This item template does not have any items yet. Create one...</div>
				)}

				{filteredItems.map((item) => (
					<ItemRowsTable
						log_id={log_id}
						key={item.item_id}
						item={item}
						rows={getRowsForItem({
							itemRows,
							item_id: +item.item_id,
							log_id
						})}
					/>
				))}
				{/* TODO: this button currently opens a NewItem modal. If we even want 
               to do that inside this view (we probably do), we should do it from 
               a smaller button in an action bar, not right here, and not with such 
               a large button. */}
				{/* <Action.WithIcon $color={"darkBlue"} onClick={handleModalOpen}>
					<LucidePencilLine />
					<span style={{ fontWeight: 600 }}>Add {itemTemplate.name}</span>
				</Action.WithIcon> */}
				{notYetSelectedItems.length > 0 && (
					<div>
						add another "{itemTemplate.name}" item to this log
						<select
							defaultValue={notYetSelectedItems[0]?.item_id}
							onChange={(e) => setSelectedOption(+e.target.value)}
						>
							{/* TODO: map over all the items that belong to this item 
                     section that aren't rendered yet */}
							{notYetSelectedItems.map((item) => (
								<option value={item.item_id} key={item.item_id}>
									{item.name}
								</option>
							))}
						</select>
						<button
							type="button"
							onClick={() => {
								setManuallySelectedItemIds((current) => [
									...current,
									+selectedOption
								]);
							}}
						>
							add
						</button>
					</div>
				)}
			</S.Wrapper>

			<Modal modalId={modalId}>
				<NewItem itemTemplate={itemTemplate} logbook_id={logbook_id} />
			</Modal>
		</>
	);
}
