import useLogDetailData from "@/components/logbooks/LogDetail/hooks/useLogDetailData";
import useUpdateLogLayout from "@/components/logbooks/LogDetail/hooks/useUpdateLogLayout";
import { computeItemTemplateSelection } from "@/components/logbooks/LogDetail/lib/item-selection";
import type { ID } from "@shared/types/data/utility.types";
import { useParams } from "@tanstack/react-router";
import { useMemo } from "react";

/** Functionality hook for LogDetail. */
export default function useLogDetail({ logbook_id }: { logbook_id?: ID }) {
	const params = useParams({ from: "/logbooks/$logbookId/log/$logId" });
	const logbookId = logbook_id ?? (params.logbookId || "0"); // TODO: do not use 0
	const logId = params.logId ?? "0"; // TODO: do not use 0

	const { isProbablySuspended, itemTemplates, itemTemplatesById, log } =
		useLogDetailData({
			logbookId,
			logId
		});
	const { appendLayoutSection } = useUpdateLogLayout({ log });

	const itemTemplateSelection = useMemo(
		() =>
			computeItemTemplateSelection({
				layout: log?.layout,
				itemTemplates,
				itemTemplatesById
			}),
		[log, itemTemplatesById, itemTemplates]
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
		itemTemplateSelection,
		appendLayoutSection
	};
}
