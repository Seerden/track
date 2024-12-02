import api from "@/lib/fetch/api";
import { mk } from "@/lib/query-keys";
import type { NewFieldTemplate, NewItemTemplate } from "@t/data/logbook.new.types";
import type { ItemTemplateAndFieldTemplates } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

type NewItemTemplateInput = {
	newItemTemplate: NewItemTemplate;
	newFieldTemplates: NewFieldTemplate[];
};

async function postNewItemTemplate(input: NewItemTemplateInput) {
	return api.post<NewItemTemplateInput, ItemTemplateAndFieldTemplates>({
		url: "/data/logbook/item/template",
		body: input
	});
}

export default function useMutateNewItemTemplate() {
	return useMutation<ItemTemplateAndFieldTemplates, unknown, NewItemTemplateInput>({
		async mutationFn(itemTemplateInput) {
			return postNewItemTemplate(itemTemplateInput);
		},
		mutationKey: mk.logbooks.itemTemplate.new
	});
}
