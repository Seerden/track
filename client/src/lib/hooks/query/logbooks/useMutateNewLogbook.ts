import api from "@/lib/fetch/api";
import { mk } from "@/lib/query-keys";
import type { NewLogbook } from "@t/data/logbook.new.types";
import type { Logbook } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

async function postNewLogbook(input: { newLogbook: NewLogbook }): Promise<Logbook> {
	return api.post<{ newLogbook: NewLogbook }, Logbook>({
		url: "/data/logbook",
		body: input
	});
}

export default function useMutateNewLogbook() {
	return useMutation<Logbook, unknown, { newLogbook: NewLogbook }>({
		async mutationFn(logbookInput) {
			return postNewLogbook(logbookInput);
		},
		mutationKey: mk.logbooks.new
	});
}
