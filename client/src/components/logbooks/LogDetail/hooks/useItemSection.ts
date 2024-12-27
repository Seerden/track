import { getFieldsForItem } from "@/components/logbooks/LogDetail/lib/get-fields";
import useQueryFields from "@/lib/hooks/query/logbooks/useQueryFields";
import type { Item } from "@t/data/logbook.types";
import { useState } from "react";

/** Functionality hook for ItemSection */
export default function useItemSection({ item }: { item: Item }) {
	const { data: fieldsData } = useQueryFields();
	const [newRowCount, setNewRowCount] = useState<number>(1);

	function addRow() {
		setNewRowCount((current) => current + 1);
	}

	const fieldsForItem = fieldsData?.byId
		? getFieldsForItem({
				item,
				fields: Object.values(fieldsData.byId)
			})
		: [];

	return {
		fieldsData,
		newRowCount,
		addRow,
		fieldsForItem
	};
}
