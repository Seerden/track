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

// TODO: logdetail currently renders a section for every
export default function LogDetail({ logbook_id }: LogDetailProps) {
	const { params } = useRouteProps();
	const logbookId = +(logbook_id ?? (params.logbookId || 0)); // TODO: do not use 0
	const logId = +(params.logId ?? 0); // TODO: do not use 0
	const { data: logsData } = useQueryLogs();
	const { data: itemTemplatesData } = useQueryItemTemplatesByLogbook(logbookId);
	const { data: itemsData } = useQueryItemsByLogbook(logbookId);

	if (!itemTemplatesData || !itemsData || !logsData) return null;

	const log = logsData.byId[logId] as Maybe<Log>;
	if (!log) return null;

	// TODO: we're currently rendering an ItemSection for _every_ itemTemplate
	// that belongs to the logbook. Instead, we should render the sections as
	// specified by the log's layout (determined by logTemplate)
	// TODO: ^ when that is implemented, also implement fine-tuning the
	// logTemplate (and logs, which can deviate from their template if they want)
	// to only allow specific items, not all items that belong to the given
	// itemTemplate
	const sections: ItemSectionProps[] = Object.values(itemTemplatesData.byId).map(
		(template) => {
			return {
				itemTemplate: template,
				items: Object.values(itemsData.byId).filter(
					// TODO: see #175 -- don't want to have to parse the id
					(item) => +item.item_template_id === +template.item_template_id
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
