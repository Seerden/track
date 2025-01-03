import logbookService from "@/lib/fetch/logbook-service";
import { queryClient } from "@/lib/query-client";
import { mk, qk } from "@/lib/query-keys";
import type { NewItemRowInput } from "@shared/types/data/logbook.new.types";
import type { ItemRowWithFieldValues } from "@shared/types/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateNewItemRow() {
	return useMutation<ItemRowWithFieldValues, unknown, NewItemRowInput>({
		async mutationFn(itemInput) {
			return logbookService.itemRows.post(itemInput);
		},
		mutationKey: mk.logbooks.item.new,
		onSuccess: () => {
			// TODO: fine-grained invalidation instead of _all_ logbooks
			queryClient.invalidateQueries({ queryKey: qk.logbooks.all });
		}
	});
}
