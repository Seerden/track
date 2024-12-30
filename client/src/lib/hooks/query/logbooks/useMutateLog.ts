import logbookService from "@/lib/fetch/logbook-service";
import { queryClient } from "@/lib/query-client";
import { mk, qk } from "@/lib/query-keys";
import type { Log, LogInput } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateLog() {
	return useMutation<Log, unknown, LogInput>({
		async mutationFn(logInput) {
			return logbookService.logs.put(logInput);
		},
		mutationKey: mk.logbooks.log.update,
		onSuccess: () => {
			// TODO: could invalidate only the updated one, and patch the value into
			// .all, but this is fine.
			queryClient.invalidateQueries({ queryKey: qk.logs.all });
		}
	});
}
