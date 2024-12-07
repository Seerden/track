import { getFields } from "@/lib/fetch/logbook-service";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { FieldsData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";

export default function useQueryFields() {
	return useQuery<FieldsData>({
		queryKey: qk.fields.all,
		queryFn: getFields,
		...defaultQueryConfig
	});
}
