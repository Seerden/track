import logbookService from "@/lib/fetch/logbook-service";
import { queryClient } from "@/lib/query-client";
import { mk, qk } from "@/lib/query-keys";
import type { NewLogbookInput } from "@t/data/logbook.new.types";
import type { Logbook } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateNewLogbook() {
	return useMutation<Logbook, unknown, NewLogbookInput>({
		async mutationFn(logbookInput) {
			return logbookService.logbooks.post(logbookInput);
		},
		mutationKey: mk.logbooks.new,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: qk.logbooks.all });
		}
	});
}
