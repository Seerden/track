import ItemSection from "@/components/logbooks/LogDetail/ItemSection";
import { getSectionsForLog } from "@/components/logbooks/LogDetail/get-sections";
import useLogDetail from "@/components/logbooks/LogDetail/useLogDetail";
import type { ID } from "@t/data/utility.types";
import S from "./style/LogDetail.style";

export type LogDetailProps = {
	logbook_id?: ID;
};

export default function LogDetail({ logbook_id }: LogDetailProps) {
	const { isProbablySuspended, logId, logbookId, log, itemTemplates, items } =
		useLogDetail({
			logbook_id
		});

	if (isProbablySuspended) return null;

	// TODO: we're currently rendering an ItemSection for _every_ itemTemplate
	// that belongs to the logbook. Instead, we should render the sections as
	// specified by the log's layout (through by log.log_template_id)
	// TODO: ^ when that is implemented, also implement fine-tuning the
	// logTemplate (and logs, which can deviate from their template if they want)
	// to only allow specific items, not all items that belong to the given
	// itemTemplate
	const sections = getSectionsForLog({
		itemTemplates,
		items,
		log_id: logId,
		logbook_id: logbookId
	});

	return (
		<S.Wrapper>
			<S.LogHeader>{log.name}</S.LogHeader>

			<S.Sections>
				{sections.map((section, index) => (
					<ItemSection
						logbook_id={logbookId}
						log_id={logId}
						key={index}
						items={section.items}
						itemTemplate={section.itemTemplate}
					/>
				))}
			</S.Sections>
		</S.Wrapper>
	);
}
