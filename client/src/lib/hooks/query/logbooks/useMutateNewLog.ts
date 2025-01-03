import logbookService from "@/lib/fetch/logbook-service";
import { queryClient } from "@/lib/query-client";
import { mk, qk } from "@/lib/query-keys";
import type { Log, NewLogInput } from "@shared/types/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateNewLog() {
	return useMutation<Log, unknown, NewLogInput>({
		async mutationFn(input) {
			return logbookService.logs.post(input);
		},
		mutationKey: mk.logbooks.log.new,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: qk.logs.all
			});
			queryClient.invalidateQueries({
				queryKey: qk.logbooks.all
			});
		}
	});
}
