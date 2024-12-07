import { postNewLogbook } from "@/lib/fetch/logbook-service";
import { mk } from "@/lib/query-keys";
import type { NewLogbookInput } from "@t/data/logbook.new.types";
import type { Logbook } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateNewLogbook() {
	return useMutation<Logbook, unknown, NewLogbookInput>({
		async mutationFn(logbookInput) {
			return postNewLogbook(logbookInput);
		},
		mutationKey: mk.logbooks.new
	});
}
