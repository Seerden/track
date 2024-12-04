import api from "@/lib/fetch/api";
import { mk } from "@/lib/query-keys";
import type { Item, NewItemInput } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

async function postNewItem(input: NewItemInput): Promise<Item> {
	return api.post<NewItemInput, Item>({
		url: "/data/logbook/item",
		body: input
	});
}

export default function useMutateNewItem() {
	return useMutation<Item, unknown, NewItemInput>({
		async mutationFn(itemInput) {
			return postNewItem(itemInput);
		},
		mutationKey: mk.logbooks.item.new
	});
}
