import api from "@/lib/fetch/api";
import { mk } from "@/lib/query-keys";
import type { Log, NewLogInput } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

async function postNewLog(input: NewLogInput): Promise<Log> {
	return api.post<NewLogInput, Log>({
		url: "/data/logbook/log",
		body: input
	});
}

export default function useMutateNewLog() {
	return useMutation<Log, unknown, NewLogInput>({
		async mutationFn(input) {
			return postNewLog(input);
		},
		mutationKey: mk.logbooks.log.new
	});
}
