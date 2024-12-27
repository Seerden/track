import useLogDetailSectionData from "@/components/logbooks/LogDetail/hooks/useLogDetailSectionData";
import useMutateLog from "@/lib/hooks/query/logbooks/useMutateLog";
import type { ModalId } from "@/lib/modal-ids";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { ItemTemplate } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import { produce } from "immer";
import { useCallback, useEffect, useMemo } from "react";

export default function useLogDetailSection({
	itemTemplate,
	log_id
}: {
	itemTemplate: ItemTemplate;
	log_id: ID;
}) {
	const { isProbablySuspended, itemRows, items, log } = useLogDetailSectionData({
		log_id,
		item_template_id: itemTemplate.item_template_id
	});
	const { mutate: putLog } = useMutateLog();

	const modalId = modalIds.logbooks.item.new(itemTemplate.name) as ModalId;
	const { openModal } = useModalState();
	function handleModalOpen(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		openModal(modalId);
	}

	// TODO: the logic for selection, includedItems, excludedItems, the append
	// fuanction and the requirement for a putLog function is extremely
	// similar to that from useLogDetail.ts. Consider refactoring this logic into
	// a shared hook somehow.
	const selection = useMemo(() => {
		return items?.reduce(
			(acc, cur) => {
				const selected = Boolean(
					log?.layout.some((section) => section.item_ids?.includes(cur.item_id))
				);
				if (selected) {
					acc.set(cur.item_id, selected);
				}
				return acc;
			},
			new Map() as Map<ID, boolean>
		);
	}, [items, log]);

	const includedItems = useMemo(() => {
		return items?.filter((item) => selection?.has(item.item_id));
	}, [items, selection]);

	const excludedItems = useMemo(() => {
		return items?.filter((item) => !selection?.has(item.item_id));
	}, [items, selection]);

	useEffect(() => {
		console.log({ log, includedItems, excludedItems });
	}, [log]);

	const appendItemToLayoutSection = useCallback(
		(item_id: ID) => {
			const logWithNewLayout = produce(log, (draft) => {
				if (!draft) {
					return;
				}

				const alreadyInLayout = Boolean(
					draft.layout.some((section) => section.item_ids?.includes(item_id))
				);

				if (alreadyInLayout) return;

				const section = draft.layout.find(
					(section) => +section.item_template_id === +itemTemplate.item_template_id
				);

				if (!section) return;

				section.item_ids = [...(section.item_ids ?? []), item_id];
			});

			if (logWithNewLayout) {
				putLog({ log: logWithNewLayout });
			}
		},
		[log, putLog]
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
		includedItems,
		excludedItems,
		appendItemToLayoutSection
	};
}
