import useLogDetailData from "@/components/logbooks/LogDetail/hooks/useLogDetailData";
import useRouteProps from "@/lib/hooks/useRouteProps";
import type { ID } from "@t/data/utility.types";
import { produce } from "immer";
import { useCallback, useState } from "react";

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

	const filteredItemTemplates = itemTemplates?.filter((template) => {
		// if the template is in log_template.layout, return true
		if (logTemplate?.layout?.flat().includes(template.item_template_id)) {
			return true;
		}
		// if any of the items that belong to the template have item rows for this
		// log, return true
		if (itemRows.some((row) => itemIdsInLog?.includes(+row.item_id))) {
			return true;
		}

		// if the user manually selected the template to be in the log, return
		// true
		return manuallySelectedItemTemplates.includes(template.item_template_id);
	});
	const notYetSelectedItemTemplates = itemTemplates?.filter(
		(template) => !filteredItemTemplates?.includes(template)
	);

	const [selectedOption, setSelectedOption] = useState<ID | null>(
		notYetSelectedItemTemplates?.[0]?.item_template_id ?? null
	);

	const toggleSelectedOptionInManualSelection = useCallback(() => {
		if (!selectedOption) return;

		setManuallySelectedItemTemplates(
			produce((draft) => {
				if (draft.includes(selectedOption)) {
					draft.splice(draft.indexOf(selectedOption), 1);
				} else {
					draft.push(selectedOption);
				}
			})
		);
	}, [selectedOption]);

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
		setSelectedOption,
		toggleSelectedOptionInManualSelection
	};
}
