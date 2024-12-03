import type { ItemSectionProps } from "@/components/logbooks/LogDetail/ItemSection";
import ItemSection from "@/components/logbooks/LogDetail/ItemSection";
import S from "./style/LogDetail.style";

export type LogDetailProps = {
	log: { name: string };
	sections: ItemSectionProps[];
};

export default function LogDetail({ log, sections }: LogDetailProps) {
	return (
		<S.Wrapper>
			<S.LogHeader>{log.name}</S.LogHeader>

			<S.Sections>
				{sections.map((section, index) => (
					<ItemSection
						key={index}
						itemRows={section.itemRows}
						itemTemplate={section.itemTemplate}
					/>
				))}
			</S.Sections>
		</S.Wrapper>
	);
}
