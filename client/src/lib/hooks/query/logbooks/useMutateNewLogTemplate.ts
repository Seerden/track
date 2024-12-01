import api from "@/lib/fetch/api";
import { mk } from "@/lib/query-keys";
import type { NewLogTemplate } from "@t/data/logbook.new.types";
import type { LogTemplate } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

// TODO: extract the input type to NewLogTemplateInput or something, so we can
// also use it in the backend (postLogTemplate handler) and so we don't have to
// repeat it in the file either.

async function postNewLogTemplate(input: {
	newLogTemplate: NewLogTemplate;
}): Promise<LogTemplate> {
	return api.post<{ newLogTemplate: NewLogTemplate }, LogTemplate>({
		url: "/data/logbook/template",
		body: input
	});
}

export default function useMutateNewLogTemplate() {
	return useMutation<LogTemplate, unknown, { newLogTemplate: NewLogTemplate }>({
		async mutationFn(logTemplateInput) {
			return postNewLogTemplate(logTemplateInput);
		},
		mutationKey: mk.logbooks.template.new
	});
}
