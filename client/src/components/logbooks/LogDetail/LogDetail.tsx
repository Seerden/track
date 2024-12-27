import useLogDetail from "@/components/logbooks/LogDetail/hooks/useLogDetail";
import ItemSection from "@/components/logbooks/LogDetail/ItemSection";
import type { ID } from "@t/data/utility.types";
import S from "./style/LogDetail.style";

export type LogDetailProps = {
	logbook_id?: ID;
};

export default function LogDetail({ logbook_id }: LogDetailProps) {
	const {
		isProbablySuspended,
		logId,
		logbookId,
		log,
		filteredItemTemplates,
		notYetSelectedItemTemplates,
		setSelectedOption,
		selectedOption,
		setManuallySelectedItemTemplates
	} = useLogDetail({
		logbook_id
	});

	if (isProbablySuspended) return null;

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
