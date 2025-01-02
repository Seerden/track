import useLogDetailSectionData from "@/components/logbooks/LogDetail/hooks/useLogDetailSectionData";
import useUpdateLogLayout from "@/components/logbooks/LogDetail/hooks/useUpdateLogLayout";
import { computeItemSelection } from "@/components/logbooks/LogDetail/lib/item-selection";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { ItemTemplate } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import { useCallback, useMemo } from "react";

type UseLogDetailSectionArgs = {
	itemTemplate: ItemTemplate;
	log_id: ID;
};

/** Functionality hook for LogDetailSection. */
export default function useLogDetailSection({
	itemTemplate,
	log_id
}: UseLogDetailSectionArgs) {
	const { isProbablySuspended, items, itemsById, log, fieldTemplates } =
		useLogDetailSectionData({
			log_id,
			item_template_id: itemTemplate.item_template_id
		});
	const { appendItemToLayoutSection } = useUpdateLogLayout({ log });

	const modalId = modalIds.logbooks.item.new(itemTemplate.name);
	const { openModal } = useModalState();
	function handleModalOpen(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		openModal(modalId);
	}

	/** Memoizes `appendItemToLayoutSection` so we don't have to pass
	 * `item_template_id` from the call-site. */
	const addItemToSection = useCallback(
		(item_id: ID) => {
			appendItemToLayoutSection(item_id, itemTemplate.item_template_id);
		},
		[itemTemplate.item_template_id, appendItemToLayoutSection]
	);

	const itemSelection = useMemo(
		() =>
			computeItemSelection({
				layout: log?.layout,
				items,
				itemsById,
				item_template_id: itemTemplate.item_template_id
			}),
		[log, items, itemsById, itemTemplate.item_template_id]
	);

	if (isProbablySuspended) {
		return {
			isProbablySuspended
		};
	}

	return {
		isProbablySuspended,
		modalId,
		items,
		itemSelection,
		handleModalOpen,
		addItemToSection,
		fieldTemplates
	};
}
