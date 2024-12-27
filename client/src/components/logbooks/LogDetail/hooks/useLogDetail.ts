import useLogDetailData from "@/components/logbooks/LogDetail/hooks/useLogDetailData";
import useRouteProps from "@/lib/hooks/useRouteProps";
import type { ID } from "@t/data/utility.types";
import { useState } from "react";

/** Functionality hook for LogDetail. */
export default function useLogDetail({ logbook_id }: { logbook_id?: ID }) {
	const { params } = useRouteProps();
	const logbookId = +(logbook_id ?? (params.logbookId || 0)); // TODO: do not use 0
	const logId = +(params.logId ?? 0); // TODO: do not use 0

	const { isProbablySuspended, itemTemplates, log, itemRows, items, logTemplate } =
		useLogDetailData({
			logbookId,
			logId
		});

	const [manuallySelectedItemTemplates, setManuallySelectedItemTemplates] = useState<
		ID[]
	>([]);

	const itemTemplateIds = itemTemplates?.map((template) => template.item_template_id);
	const itemIdsInLog = items
		?.filter((item) => itemTemplateIds?.includes(item.item_template_id))
		.map((item) => +item.item_id);

	// const filteredItemTemplates = itemTemplates?.filter((template) => {
	// 	// if the template is in log_template.layout, return true
	// 	if (logTemplate?.layout?.flat().includes(template.item_template_id)) {
	// 		return true;
	// 	}
	// 	// if any of the items that belong to the template have item rows for this
	// 	// log, return true
	// 	if (itemRows.some((row) => itemIdsInLog?.includes(+row.item_id))) {
	// 		return true;
	// 	}

	// 	if (itemTemplates.some((t) => t.item_template_id === template.item_template_id)) {
	// 		return true;
	// 	}
	// 	// if the user manually selected the template to be in the log, return
	// 	// true
	// 	return manuallySelectedItemTemplates.includes(template.item_template_id);
	// });

	const itemTemplateIdsInLog = log?.layout
		? log.layout.map((section) => +section.item_template_id)
		: [];
	console.log({ itemTemplateIdsInLog });
	const filteredItemTemplates = itemTemplates?.filter((template) =>
		itemTemplateIdsInLog?.includes(+template.item_template_id)
	);

	console.log({ manuallySelectedItemTemplates });

	const notYetSelectedItemTemplates = itemTemplates?.filter(
		(template) => !filteredItemTemplates?.includes(template)
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
		filteredItemTemplates,
		notYetSelectedItemTemplates,
		itemTemplates,
		itemTemplateIdsInLog
	};
}
