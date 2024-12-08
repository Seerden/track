import logbookService from "@/lib/fetch/logbook-service";
import { mk } from "@/lib/query-keys";
import type { Log, NewLogInput } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateNewLog() {
	return useMutation<Log, unknown, NewLogInput>({
		async mutationFn(input) {
			return logbookService.logs.post(input);
		},
		mutationKey: mk.logbooks.log.new
	});
}
