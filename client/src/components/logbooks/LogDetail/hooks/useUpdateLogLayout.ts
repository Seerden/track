import useMutateLog from "@/lib/hooks/query/logbooks/useMutateLog";
import type { Log } from "@t/data/logbook.types";
import type { ID, Maybe } from "@t/data/utility.types";
import { produce } from "immer";
import { useCallback } from "react";

export default function useUpdateLogLayout({ log }: { log: Maybe<Log> }) {
	const { mutate: putLog } = useMutateLog();

	const appendItemToLayoutSection = useCallback(
		(item_id: ID, item_template_id: ID) => {
			const logWithNewLayout = produce(log, (draft) => {
				if (!draft) return;

				const alreadyInLayout = Boolean(
					draft.layout.some((section) => section.item_ids?.includes(item_id))
				);

				if (alreadyInLayout) return;

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

	const appendLayoutSection = useCallback(
		(item_template_id: ID) => {
			const logWithNewLayout = produce(log, (draft) => {
				if (!draft) return;

				const alreadyInLayout = Boolean(
					draft.layout.find(
						(section) => +section.item_template_id === +item_template_id
					)
				);

				if (alreadyInLayout) return;

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
