import { postNewItemTemplate } from "@/lib/fetch/logbook-service";
import modalIds from "@/lib/modal-ids";
import { queryClient } from "@/lib/query-client";
import { mk, qk } from "@/lib/query-keys";
import { useModalState } from "@/lib/state/modal-state";
import type { NewItemTemplateInput } from "@t/data/logbook.new.types";
import type { ItemTemplateAndFieldTemplates } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateNewItemTemplate() {
	const { closeModal } = useModalState();

	return useMutation<ItemTemplateAndFieldTemplates, unknown, NewItemTemplateInput>({
		async mutationFn(itemTemplateInput) {
			return postNewItemTemplate(itemTemplateInput);
		},
		mutationKey: mk.logbooks.itemTemplate.new,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: qk.itemTemplates.byLogbook(data.itemTemplate.logbook_id)
			});

			closeModal(modalIds.logbooks.itemTemplate.new);
		}
	});
}
