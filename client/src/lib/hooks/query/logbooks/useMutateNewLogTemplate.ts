import api from "@/lib/fetch/api";
import { mk } from "@/lib/query-keys";
import type { NewLogTemplateInput } from "@t/data/logbook.new.types";
import type { LogTemplate } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

async function postNewLogTemplate(input: NewLogTemplateInput): Promise<LogTemplate> {
	return api.post<NewLogTemplateInput, LogTemplate>({
		url: "/data/logbook/template",
		body: input
	});
}

export default function useMutateNewLogTemplate() {
	return useMutation<LogTemplate, unknown, NewLogTemplateInput>({
		async mutationFn(logTemplateInput) {
			return postNewLogTemplate(logTemplateInput);
		},
		mutationKey: mk.logbooks.template.new
	});
}
