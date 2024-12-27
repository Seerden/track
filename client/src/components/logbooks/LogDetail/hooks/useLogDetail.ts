import useLogDetailData from "@/components/logbooks/LogDetail/hooks/useLogDetailData";
import useMutateLog from "@/lib/hooks/query/logbooks/useMutateLog";
import useRouteProps from "@/lib/hooks/useRouteProps";
import type { ID } from "@t/data/utility.types";
import { produce } from "immer";
import { useCallback, useMemo } from "react";

/** Functionality hook for LogDetail. */
export default function useLogDetail({ logbook_id }: { logbook_id?: ID }) {
	const { params } = useRouteProps();
	const { mutate: putLog } = useMutateLog();
	const logbookId = +(logbook_id ?? (params.logbookId || 0)); // TODO: do not use 0
	const logId = +(params.logId ?? 0); // TODO: do not use 0

	const { isProbablySuspended, itemTemplates, log } = useLogDetailData({
		logbookId,
		logId
	});

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

	const appendLayoutSection = useCallback(
		(item_template_id: ID) => {
			const logWithNewLayout = produce(log, (draft) => {
				if (!draft) {
					return;
				}

				const alreadyInLayout = Boolean(
					draft.layout.find(
						(section) => +section.item_template_id === +item_template_id
					)
				);

				if (alreadyInLayout) {
					return;
				}

				draft.layout.push({
					item_template_id,
					item_ids: null
				});
			});

			if (logWithNewLayout) {
				putLog({ log: logWithNewLayout });
			}
		},
		[log, putLog]
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
