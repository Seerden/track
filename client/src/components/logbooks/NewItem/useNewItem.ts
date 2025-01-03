import useMutateNewItem from "@/lib/hooks/query/logbooks/useMutateNewItem";
import useQueryFields from "@/lib/hooks/query/logbooks/useQueryFields";
import { byIdAsList } from "@/lib/hooks/query/select-map-by-id";
import type { ModalId } from "@/lib/modal-ids";
import modalIds from "@/lib/modal-ids";
import { queryClient } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import { useModalState } from "@/lib/state/modal-state";
import type { NewItem } from "@shared/types/data/logbook.new.types";
import type { ItemTemplate } from "@shared/types/data/logbook.types";
import type { ID } from "@shared/types/data/utility.types";
import { useState } from "react";

export default function useNewItem({
	logbook_id,
	itemTemplate
}: {
	logbook_id: ID;
	itemTemplate: ItemTemplate;
}) {
	const { data: fieldsData } = useQueryFields();

	const isProbablySuspended = !fieldsData;

	const [item, setItem] = useState<NewItem>({
		logbook_id,
		item_template_id: itemTemplate.item_template_id,
		name: ""
	});

	const { mutate: submit } = useMutateNewItem();
	const { closeModal } = useModalState();
	// TODO: this same modalId is used in ItemSection, so we need to ensure that
	// the two always match. We should make the template id part of the modalId
	// value.
	const modalId = modalIds.logbooks.item.new(itemTemplate.name) as ModalId;

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setItem((cur) => ({ ...cur, [e.target.name]: e.target.value }));
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		submit(
			{ newItem: item },
			{
				onSuccess: () => {
					closeModal(modalId);
					// TODO: use a more fine-grained query key to invalidate
					queryClient.invalidateQueries({ queryKey: qk.logbooks.all, exact: false });
				}
			}
		);
	}

	if (isProbablySuspended) {
		return {
			isProbablySuspended
		};
	}

	const fieldsForItemTemplate = byIdAsList(fieldsData.byId).filter(
		// TODO: a case where we _have to_ parse an id to a number because as a
		// bigint, it comes in as a string -- see
		// https://github.com/Seerden/track/issues/175
		(field) => +field.item_template_id === +itemTemplate.item_template_id
	);

	return {
		handleInputChange,
		handleSubmit,
		fieldsForItemTemplate,
		item
	};
}
