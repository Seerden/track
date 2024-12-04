import api from "@/lib/fetch/api";
import { mk } from "@/lib/query-keys";
import type { Log, NewLog } from "@t/data/logbook.types";
import { useMutation } from "@tanstack/react-query";

async function postNewLog(input: { newLog: NewLog }): Promise<Log> {
	return api.post<{ newLog: NewLog }, Log>({
		url: "/data/logbook/log",
		body: input
	});
}

export default function useMutateNewLog() {
	return useMutation<Log, unknown, { newLog: NewLog }>({
		async mutationFn(input) {
			return postNewLog(input);
		},
		mutationKey: mk.logbooks.log.new
	});
}
