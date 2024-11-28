import type { ItemSectionProps } from "@/components/logbooks/LogDetail/ItemSection";
import ItemSection from "@/components/logbooks/LogDetail/ItemSection";
import S from "./style/LogDetail.style";

export type LogDetailProps = {
	log: { name: string };
	sections: ItemSectionProps[];
};

export default function LogDetail(props: LogDetailProps) {
	return (
		<S.Wrapper>
			<S.LogHeader>{props.log.name}</S.LogHeader>

			<S.Sections>
				{props.sections.map((section, index) => (
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
