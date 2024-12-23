import useLogDetail from "@/components/logbooks/LogDetail/hooks/useLogDetail";
import ItemSection from "@/components/logbooks/LogDetail/ItemSection";
import { useQueryItemRowsByLog } from "@/lib/hooks/query/logbooks/useQueryItemRows";
import { useQueryItemsByLogbook } from "@/lib/hooks/query/logbooks/useQueryItems";
import { useQueryLogTemplate } from "@/lib/hooks/query/logbooks/useQueryLogTemplates";
import type { ID } from "@t/data/utility.types";
import { useState } from "react";
import S from "./style/LogDetail.style";

export type LogDetailProps = {
	logbook_id?: ID;
};

export default function LogDetail({ logbook_id }: LogDetailProps) {
	const { isProbablySuspended, logId, logbookId, log, itemTemplates } = useLogDetail({
		logbook_id
	});

	const { data: logTemplate } = useQueryLogTemplate(log?.log_template_id ?? 0);
	// TODO: we also query itemRowsData in useItemSection. Probably not
	// necessary, but since it's cached anyway, it doesn't really matter.
	const { data: itemRowsData } = useQueryItemRowsByLog({ log_id: logId ? +logId : 0 });
	const { data: itemsData } = useQueryItemsByLogbook(logbookId ?? 0);

	const [manuallySelectedItemTemplates, setManuallySelectedItemTemplates] = useState<
		ID[]
	>([]);

	console.log({ itemTemplates });

	const itemRows = Object.values(itemRowsData?.byId ?? {});
	const items = itemsData?.byId ? Object.values(itemsData.byId) : [];
	const itemTemplateIds = itemTemplates?.map((template) => template.item_template_id);
	const itemIdsInLog = items
		.filter((item) => itemTemplateIds?.includes(item.item_template_id))
		.map((item) => +item.item_id);

	const filteredItemTemplates = itemTemplates?.filter((template) => {
		// if the template is in log_template.layout, return true
		if (logTemplate?.layout?.flat().includes(template.item_template_id)) {
			return true;
		}
		// if any of the items that belong to the template have item rows for this
		// log, return true
		if (itemRows.some((row) => itemIdsInLog.includes(+row.item_id))) {
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
	if (isProbablySuspended || !logTemplate || !itemRowsData || !itemsData) return null;

	return (
		<S.Wrapper>
			<S.LogHeader>{log.name}</S.LogHeader>

			<S.Sections>
				{filteredItemTemplates?.map((template, index) => (
					<ItemSection
						logbook_id={logbookId}
						log_id={logId}
						key={index}
						itemTemplate={template}
					/>
				))}
				{(notYetSelectedItemTemplates?.length ?? 0) > 0 && (
					<div>
						Add another section:
						<select
							defaultValue={notYetSelectedItemTemplates?.[0]?.item_template_id}
							onChange={(e) => setSelectedOption(+e.target.value)}
						>
							{notYetSelectedItemTemplates?.map((template) => (
								<option
									value={template.item_template_id}
									key={template.item_template_id}
								>
									{template.name}
								</option>
							))}
						</select>
						<button
							onClick={() => {
								if (selectedOption) {
									setManuallySelectedItemTemplates((current) => [
										...current,
										selectedOption
									]);
								}
							}}
							type="button"
						>
							Add
						</button>
					</div>
				)}
			</S.Sections>
		</S.Wrapper>
	);
}
