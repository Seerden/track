import useMutateLog from "@/lib/hooks/query/logbooks/useMutateLog";
import type { Log } from "@t/data/logbook.types";
import type { ID, Maybe } from "@t/data/utility.types";
import { produce } from "immer";
import { useCallback } from "react";

/** This hook exposes two memoized functions that add an item or item template to the
 * specified log's layout. */
export default function useUpdateLogLayout({ log }: { log: Maybe<Log> }) {
	const { mutate: putLog } = useMutateLog();

	/** If it's not already in the layout, this appends an item to the log's
	 * layout. */
	const appendItemToLayoutSection = useCallback(
		(item_id: ID, item_template_id: ID) => {
			const logWithNewLayout = produce(log, (draft) => {
				if (!draft) return;

				if (draft.layout.some((section) => section.item_ids?.includes(item_id)))
					return; // item is already in layout, no need to append it.

				const section = draft.layout.find(
					(section) => +section.item_template_id === +item_template_id
				);

				if (!section) return;

				if (!section.item_ids) {
					section.item_ids = [item_id];
				} else {
					section.item_ids.push(item_id);
				}
			});

			if (logWithNewLayout) {
				putLog({ log: logWithNewLayout });
			}
		},
		[log, putLog]
	);

	/** If it's not already included, this appends an itemTemplate section to the
	 * log's layout. */
	const appendLayoutSection = useCallback(
		(item_template_id: ID) => {
			const logWithNewLayout = produce(log, (draft) => {
				if (
					!draft ||
					draft.layout.some(
						(section) => +section.item_template_id === +item_template_id
					) // itemTemplate is already in layout, no need to append it.
				) {
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

	return {
		appendItemToLayoutSection,
		appendLayoutSection
	};
}
