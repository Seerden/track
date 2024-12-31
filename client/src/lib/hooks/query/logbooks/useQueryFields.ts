import logbookService from "@/lib/fetch/logbook-service";
import { select } from "@/lib/hooks/query/select-map-by-id";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export default function useQueryFields() {
	return useQuery({
		queryKey: qk.fields.all,
		queryFn: logbookService.fields.getByUser,
		select,
		...defaultQueryConfig
	});
}
