import api from "@/lib/fetch/api";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { FieldsData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";

async function getFields() {
	return api.get<FieldsData>({ url: "/data/logbooks/fields" });
}

export default function useQueryFields() {
	return useQuery<FieldsData>({
		queryKey: qk.fields.all,
		queryFn: getFields,
		...defaultQueryConfig
	});
}
