import logbookService from "@/lib/fetch/logbook-service";
import { queryClient } from "@/lib/query-client";
import { mk, qk } from "@/lib/query-keys";
import type { NewLogbookInput } from "@shared/types/data/logbook.new.types";
import type { Logbook } from "@shared/types/data/logbook.types";
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
