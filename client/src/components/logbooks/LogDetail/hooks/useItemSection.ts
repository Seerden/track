import { getFieldsForItem } from "@/components/logbooks/LogDetail/lib/get-fields";
import useQueryFields from "@/lib/hooks/query/logbooks/useQueryFields";
import type { Item } from "@t/data/logbook.types";

/** Functionality hook for ItemSection */
export default function useItemSection({ item }: { item: Item }) {
	const { data: fieldsData } = useQueryFields();

	// TODO: this should come from the server.
	const fieldsForItem = fieldsData?.byId
		? getFieldsForItem({
				item,
				fields: Object.values(fieldsData.byId)
			})
		: [];

	return {
		fieldsData,
		fieldsForItem
	};
}
