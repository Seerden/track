import type { ItemSectionProps } from "@/components/logbooks/LogDetail/ItemSection";
import ItemSection from "@/components/logbooks/LogDetail/ItemSection";
import { useQueryItemTemplatesByLogbook } from "@/lib/hooks/query/logbooks/useQueryItemTemplates";
import { useQueryItemsByLogbook } from "@/lib/hooks/query/logbooks/useQueryItems";
import useQueryLogs from "@/lib/hooks/query/logbooks/useQueryLogs";
import useRouteProps from "@/lib/hooks/useRouteProps";
import type { Log } from "@t/data/logbook.types";
import type { ID, Maybe } from "@t/data/utility.types";
import S from "./style/LogDetail.style";

export type LogDetailProps = {
	logbook_id?: ID;
};

export default function LogDetail({ logbook_id }: LogDetailProps) {
	const { params } = useRouteProps();
	const logbookId = +(logbook_id ?? (params.logbookId || 0)); // TODO: do not use 0
	const logId = +(params.logId ?? 0); // TODO: do not use 0
	const { data: logsData } = useQueryLogs();
	const { data: itemTemplatesById } = useQueryItemTemplatesByLogbook(logbookId);
	const { data: itemsById } = useQueryItemsByLogbook(logbookId);

	if (!itemTemplatesById || !itemsById || !logsData) return null;

	const log = logsData.byId[logId] as Maybe<Log>;
	if (!log) return null;

	const sections: ItemSectionProps[] = Object.values(itemTemplatesById.byId).map(
		(template) => {
			return {
				itemTemplate: template,
				items: Object.values(itemsById.byId).filter(
					(item) => item.item_template_id === template.item_template_id
				),
				logbook_id: logbookId,
				log_id: log.log_id
			};
		}
	);

	return (
		<S.Wrapper>
			<S.LogHeader>{log.name}</S.LogHeader>

			<S.Sections>
				{sections.map((section, index) => (
					<ItemSection
						logbook_id={logbookId}
						log_id={log.log_id}
						key={index}
						items={section.items}
						itemTemplate={section.itemTemplate}
					/>
				))}
			</S.Sections>
		</S.Wrapper>
	);
}
