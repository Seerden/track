import type { ItemRowsProps } from "@/components/logbooks/LogDetail/ItemRows";
import ItemRows from "@/components/logbooks/LogDetail/ItemRows";
import { Button } from "@/components/logbooks/LogDetail/style/_common.style";
import { LucidePencilLine } from "lucide-react";
import S from "./style/ItemSection.style";

export type ItemSectionProps = {
	itemTemplate: {
		name: string;
	};
	itemRows: ItemRowsProps[];
};

export default function ItemSection({ itemTemplate, itemRows }: ItemSectionProps) {
	return (
		<S.Wrapper>
			<S.Header>{itemTemplate.name}</S.Header>

			{itemRows.map(({ item, rows }) => (
				<ItemRows key={item.name} item={item} rows={rows} />
			))}
			<Button $iconPosition={"left"} $color={"darkBlue"}>
				<LucidePencilLine />
				<span style={{ fontWeight: 600 }}>Add {itemTemplate.name}</span>{" "}
			</Button>
		</S.Wrapper>
	);
}
