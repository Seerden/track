import useLogDetailData from "@/components/logbooks/LogDetail/hooks/useLogDetailData";
import useUpdateLogLayout from "@/components/logbooks/LogDetail/hooks/useUpdateLogLayout";
import useRouteProps from "@/lib/hooks/useRouteProps";
import type { ItemTemplate } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";

/** Functionality hook for LogDetail. */
export default function useLogDetail({ logbook_id }: { logbook_id?: ID }) {
	const { params } = useRouteProps();
	const logbookId = +(logbook_id ?? (params.logbookId || 0)); // TODO: do not use 0
	const logId = +(params.logId ?? 0); // TODO: do not use 0

	const { isProbablySuspended, itemTemplates, itemTemplatesById, log } =
		useLogDetailData({
			logbookId,
			logId
		});
	const { appendLayoutSection } = useUpdateLogLayout({ log });

	if (isProbablySuspended) {
		return {
			isProbablySuspended
		};
	}

	// TODO: this itemTemplateSelection computation should be a pure function
	// that's called with memoized values, so we can test it properly. In fact,
	// it should probably be on the server altogether.
	const layoutSectionIds = log?.layout.map((section) => section.item_template_id) ?? [];

	const included = layoutSectionIds.reduce((acc, cur) => {
		const template = itemTemplatesById.get(cur);
		return template ? acc.concat(template) : acc;
	}, [] as ItemTemplate[]);

	const excluded = itemTemplates.filter(
		(template) =>
			!included.some((i) => i.item_template_id === template.item_template_id)
	);

	const itemTemplateSelection = {
		included,
		excluded
	};

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
