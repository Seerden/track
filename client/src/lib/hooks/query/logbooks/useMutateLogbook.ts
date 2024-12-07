import { putLogbook } from "@/lib/fetch/logbook-service";
import { mk } from "@/lib/query-keys";
import type { Logbook, LogbookInput } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateLogbook() {
	return useMutation<Logbook, unknown, LogbookInput>({
		async mutationFn(logbookInput) {
			return putLogbook(logbookInput);
		},
		mutationKey: mk.logbooks.update
	});
}
