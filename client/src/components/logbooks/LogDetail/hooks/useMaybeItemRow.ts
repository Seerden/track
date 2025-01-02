import { useQueryFieldsByItemRow } from "@/lib/hooks/query/logbooks/useQueryFields";
import type { ID } from "@t/data/utility.types";

export default function useMaybeItemRow({ item_row_id }: { item_row_id: ID }) {
	const { data: fieldsData } = useQueryFieldsByItemRow({ item_row_id });

	const isProbablySuspended = !fieldsData;

	if (isProbablySuspended)
		return {
			isProbablySuspended
		};

	const fields = fieldsData.fields;

	return {
		isProbablySuspended,
		fields
	};
}
