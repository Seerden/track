import useLogDetailSectionData from "@/components/logbooks/LogDetail/hooks/useLogDetailSectionData";
import useUpdateLogLayout from "@/components/logbooks/LogDetail/hooks/useUpdateLogLayout";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { Item, ItemTemplate } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import { useCallback } from "react";

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

	if (isProbablySuspended) {
		return {
			isProbablySuspended
		};
	}

	// TODO: see note with layoutSectionIds in `useLogDetail`. Handle this the
	// same way.
	const layoutSectionItemIds =
		log?.layout.find(
			(section) => section.item_template_id === itemTemplate.item_template_id
		)?.item_ids ?? [];

	const included = layoutSectionItemIds?.reduce((acc, cur) => {
		const item = itemsById.get(cur);
		return item ? acc.concat(item) : acc;
	}, [] as Item[]);

	const excluded = items.filter(
		(item) => !included.some((i) => i.item_id === item.item_id)
	);

	const itemSelection = {
		included,
		excluded
	};

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
