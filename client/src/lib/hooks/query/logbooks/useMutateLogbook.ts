import logbookService from "@/lib/fetch/logbook-service";
import { queryClient } from "@/lib/query-client";
import { mk, qk } from "@/lib/query-keys";
import type { Logbook, LogbookInput } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateLogbook() {
	return useMutation<Logbook, unknown, LogbookInput>({
		async mutationFn(logbookInput) {
			return logbookService.logbooks.put(logbookInput);
		},
		mutationKey: mk.logbooks.update,
		onSuccess: () => {
			// TODO: could invalidate only the updated one, and patch the value into
			// .all, but this is fine.
			queryClient.invalidateQueries({ queryKey: qk.logbooks.all });
		}
	});
}
