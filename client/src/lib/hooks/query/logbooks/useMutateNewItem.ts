import api from "@/lib/fetch/api";
import { mk } from "@/lib/query-keys";
import type { NewItem } from "@t/data/logbook.new.types";
import type { Item } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

async function postNewItem(input: { newItem: NewItem }): Promise<Item> {
	return api.post<{ newItem: NewItem }, Item>({
		url: "/data/logbook/item",
		body: input
	});
}

export default function useMutateNewItem() {
	return useMutation<Item, unknown, { newItem: NewItem }>({
		async mutationFn(itemInput) {
			return postNewItem(itemInput);
		},
		mutationKey: mk.logbooks.item.new
	});
}
