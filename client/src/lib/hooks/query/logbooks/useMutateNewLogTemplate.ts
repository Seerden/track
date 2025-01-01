import logbookService from "@/lib/fetch/logbook-service";
import { queryClient } from "@/lib/query-client";
import { mk, qk } from "@/lib/query-keys";
import type { NewLogTemplateInput } from "@t/data/logbook.new.types";
import type { LogTemplate } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateNewLogTemplate() {
	return useMutation<LogTemplate, unknown, NewLogTemplateInput>({
		async mutationFn(logTemplateInput) {
			return logbookService.logTemplates.post(logTemplateInput);
		},
		mutationKey: mk.logbooks.template.new,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: qk.logTemplates.all
			});
		}
	});
}
