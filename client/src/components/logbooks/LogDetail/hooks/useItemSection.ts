import useQueryItemRows from "@/lib/hooks/query/logbooks/useQueryItemRows";
import type { ModalId } from "@/lib/modal-ids";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { ItemTemplate } from "@t/data/logbook.types";

export default function useItemSection({ itemTemplate }: { itemTemplate: ItemTemplate }) {
	const { data: itemRowsData } = useQueryItemRows();
	const modalId = `${modalIds.logbooks.item.new}-${itemTemplate.name}` as ModalId;

	const { openModal } = useModalState();

	function handleModalOpen(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		openModal(modalId);
	}

	const isProbablySuspended = !itemRowsData;

	if (isProbablySuspended) {
		return {
			isProbablySuspended
		};
	}

	return {
		isProbablySuspended,
		itemRows: Object.values(itemRowsData.byId),
		modalId,
		handleModalOpen
	};
}
