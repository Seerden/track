import { getFieldsForItem } from "@/components/logbooks/LogDetail/lib/get-fields";
import useQueryFields from "@/lib/hooks/query/logbooks/useQueryFields";
import type { Item } from "@t/data/logbook.types";

/** Functionality hook for ItemSection */
export default function useItemSection({ item }: { item: Item }) {
	const { data: fieldsData } = useQueryFields();

	const isProbablySuspended = !fieldsData;

	if (isProbablySuspended) {
		return {
			isProbablySuspended
		};
	}

	const fields = Object.values(fieldsData.byId);

	// TODO: this should come from the server, instead of us fetching all fields
	// and filtering them here.
	const fieldsForItem = getFieldsForItem({
		item,
		fields
	});

	return {
		isProbablySuspended,
		fieldsForItem
	};
}
