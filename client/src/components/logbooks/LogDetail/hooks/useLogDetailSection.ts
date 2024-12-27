import useLogDetailSectionData from "@/components/logbooks/LogDetail/hooks/useLogDetailSectionData";
import type { ModalId } from "@/lib/modal-ids";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { ItemTemplate } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import { useMemo, useState } from "react";

export default function useLogDetailSection({
	itemTemplate,
	logbook_id,
	log_id
}: {
	itemTemplate: ItemTemplate;
	logbook_id: ID;
	log_id: ID;
}) {
	const { isProbablySuspended, itemRows, items, layout } = useLogDetailSectionData({
		log_id,
		logbook_id,
		item_template_id: itemTemplate.item_template_id
	});

	const modalId = modalIds.logbooks.item.new(itemTemplate.name) as ModalId;
	const { openModal } = useModalState();
	function handleModalOpen(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		openModal(modalId);
	}

	const [manuallySelectedItemIds, setManuallySelectedItemIds] = useState<ID[]>([]);

	const selectedItemIds = useMemo(() => {
		// TODO: this should be done at a higher level in the component tree.
		// Determine which sections (and which items) to render before we even get
		// to this ItemSection component.
		return items
			?.map((item) => +item.item_id)
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
	const filteredItems = items?.filter((item) =>
		selectedItemIds?.includes(+item.item_id)
	);

	const notYetSelectedItems = items?.filter(
		(item) => !selectedItemIds?.includes(+item.item_id)
	);
	const [selectedOption, setSelectedOption] = useState<ID>(
		+(notYetSelectedItems?.[0]?.item_id ?? 0) // TODO: do not use 0
	);

	if (isProbablySuspended) {
		return {
			isProbablySuspended
		};
	}

	return {
		isProbablySuspended,
		itemRows,
		modalId,
		handleModalOpen,
		items,
		filteredItems,
		notYetSelectedItems,
		setSelectedOption,
		setManuallySelectedItemIds,
		selectedOption
	};
}
