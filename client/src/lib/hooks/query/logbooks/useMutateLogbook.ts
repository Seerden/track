import api from "@/lib/fetch/api";
import { mk } from "@/lib/query-keys";
import type { Logbook } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

async function putLogbook(input: { logbook: Logbook }): Promise<Logbook> {
	return api.put<{ logbook: Logbook }, Logbook>({
		url: `/data/logbook/${input.logbook.logbook_id}`,
		body: input
	});
}

export default function useMutateLogbook() {
	return useMutation<Logbook, unknown, { logbook: Logbook }>({
		async mutationFn(logbookInput) {
			return putLogbook(logbookInput);
		},
		mutationKey: mk.logbooks.update
	});
}
