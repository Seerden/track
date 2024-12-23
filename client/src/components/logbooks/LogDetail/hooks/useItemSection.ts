import { useQueryItemRowsByLog } from "@/lib/hooks/query/logbooks/useQueryItemRows";
import type { ModalId } from "@/lib/modal-ids";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { ItemTemplate } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";

export default function useItemSection({
	itemTemplate,
	log_id
}: {
	itemTemplate: ItemTemplate;
	log_id: ID;
}) {
	const { data: itemRowsData } = useQueryItemRowsByLog({ log_id });
	const modalId = modalIds.logbooks.item.new(itemTemplate.name) as ModalId;

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
