import useLogDetailSection from "@/components/logbooks/LogDetail/hooks/useLogDetailSection";
import ItemSection from "@/components/logbooks/LogDetail/ItemSection";
import { getRowsForItem } from "@/components/logbooks/LogDetail/lib/get-rows";
import NewItem from "@/components/logbooks/NewItem/NewItem";
import Modal from "@/components/utility/Modal/Modal";
import type { ItemTemplate } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import S from "./style/LogDetailSection.style";

export type LogDetailSectionProps = {
	itemTemplate: ItemTemplate;
	log_id: ID;
	logbook_id: ID;
};

export default function LogDetailSection({
	itemTemplate,
	log_id,
	logbook_id
}: LogDetailSectionProps) {
	const {
		isProbablySuspended,
		modalId,
		handleModalOpen,
		itemRows,
		items,
		filteredItems,
		notYetSelectedItems,
		setSelectedOption,
		setManuallySelectedItemIds,
		selectedOption
	} = useLogDetailSection({
		itemTemplate,
		log_id,
		logbook_id
	});

	if (isProbablySuspended) return null;

	return (
		<>
			<S.Wrapper>
				<S.Header>{itemTemplate.name}</S.Header>
				{!!items && items.length === 0 && (
					// TODO: implement the button to add a new item here
					<>
						<p>
							This item template does not have any items yet. Add one to get
							started.
						</p>
						<button type="button" onClick={handleModalOpen}>
							Add an item
						</button>
					</>
				)}

				{filteredItems?.map((item) => (
					<ItemSection
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
				{!!notYetSelectedItems && notYetSelectedItems.length > 0 && (
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
