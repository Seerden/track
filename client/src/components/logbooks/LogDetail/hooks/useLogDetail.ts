import useLogDetailData from "@/components/logbooks/LogDetail/hooks/useLogDetailData";
import useUpdateLogLayout from "@/components/logbooks/LogDetail/hooks/useUpdateLogLayout";
import useRouteProps from "@/lib/hooks/useRouteProps";
import type { ID } from "@t/data/utility.types";
import { useMemo } from "react";

/** Functionality hook for LogDetail. */
export default function useLogDetail({ logbook_id }: { logbook_id?: ID }) {
	const { params } = useRouteProps();
	const logbookId = +(logbook_id ?? (params.logbookId || 0)); // TODO: do not use 0
	const logId = +(params.logId ?? 0); // TODO: do not use 0

	const { isProbablySuspended, itemTemplates, log } = useLogDetailData({
		logbookId,
		logId
	});
	const { appendLayoutSection } = useUpdateLogLayout({ log });

	const selection = useMemo(() => {
		return itemTemplates?.reduce(
			(acc, cur) => {
				const selected = Boolean(
					log?.layout.find(
						(section) => +section.item_template_id === +cur.item_template_id
					)
				);
				if (selected) {
					acc.set(cur.item_template_id, selected);
				}
				return acc;
			},
			new Map() as Map<ID, boolean>
		);
	}, [itemTemplates, log]);

	const includedItemTemplates = itemTemplates?.filter((template) =>
		selection?.has(template.item_template_id)
	);
	const excludedItemTemplates = itemTemplates?.filter(
		(template) => !selection?.has(template.item_template_id)
	);

	if (isProbablySuspended) {
		return {
			isProbablySuspended
		};
	}

	return {
		isProbablySuspended,
		logId,
		logbookId,
		log,
		itemTemplates,
		includedItemTemplates,
		excludedItemTemplates,
		appendLayoutSection
	};
}
