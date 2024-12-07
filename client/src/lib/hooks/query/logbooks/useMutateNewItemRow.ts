import { postNewItemRow } from "@/lib/fetch/logbook-service";
import { queryClient } from "@/lib/query-client";
import { mk, qk } from "@/lib/query-keys";
import type { NewItemRowInput } from "@t/data/logbook.new.types";
import type { ItemRowWithFieldValues } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateNewItemRow() {
	return useMutation<ItemRowWithFieldValues, unknown, NewItemRowInput>({
		async mutationFn(itemInput) {
			return postNewItemRow(itemInput);
		},
		mutationKey: mk.logbooks.item.new,
		onSuccess: () => {
			// TODO: fine-grained invalidation instead of _all_ logbooks
			queryClient.invalidateQueries({ queryKey: qk.logbooks.all });
		}
	});
}
