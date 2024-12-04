import api from "@/lib/fetch/api";
import { mk } from "@/lib/query-keys";
import type { Logbook, LogbookInput } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

async function putLogbook(input: LogbookInput): Promise<Logbook> {
	return api.put<LogbookInput, Logbook>({
		url: `/data/logbook/${input.logbook.logbook_id}`,
		body: input
	});
}

export default function useMutateLogbook() {
	return useMutation<Logbook, unknown, LogbookInput>({
		async mutationFn(logbookInput) {
			return putLogbook(logbookInput);
		},
		mutationKey: mk.logbooks.update
	});
}
