import logbookService from "@/lib/fetch/logbook-service";
import { queryClient } from "@/lib/query-client";
import { mk, qk } from "@/lib/query-keys";
import type { Item, NewItemInput } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateNewItem() {
	return useMutation<Item, unknown, NewItemInput>({
		async mutationFn(itemInput) {
			return logbookService.items.post(itemInput);
		},
		mutationKey: mk.logbooks.item.new,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: qk.items.all
			});
		}
	});
}
