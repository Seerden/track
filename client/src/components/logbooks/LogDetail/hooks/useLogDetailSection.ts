import useLogDetailSectionData from "@/components/logbooks/LogDetail/hooks/useLogDetailSectionData";
import useUpdateLogLayout from "@/components/logbooks/LogDetail/hooks/useUpdateLogLayout";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { Item, ItemTemplate } from "@t/data/logbook.types";
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
	const { isProbablySuspended, items, log, fieldTemplates } = useLogDetailSectionData({
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

	// TODO: the logic for selection, includedItems, excludedItems is extremely
	// similar to that from `useLogDetail`. Consider refactoring this logic into
	// a shared hook somehow, like we did with `useUpdateLogLayout`.
	const itemSelection = useMemo(() => {
		return items?.reduce(
			(acc, cur) => {
				const selected = Boolean(
					log?.layout.some((section) => section.item_ids?.includes(cur.item_id))
				);
				if (selected) {
					acc.included.push(cur);
				} else {
					acc.excluded.push(cur);
				}
				return acc;
			},
			{
				included: [] as Item[],
				excluded: [] as Item[]
			} as const
		);
	}, [items, log]);

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
