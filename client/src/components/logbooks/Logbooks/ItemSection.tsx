import type { ItemRowsProps } from "@/components/logbooks/Logbooks/ItemRows";
import ItemRows from "@/components/logbooks/Logbooks/ItemRows";
import { Action } from "@/lib/theme/components/buttons";
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
			<Action.Default
				$color={"darkBlue"}
				style={{
					width: "max-content",
					borderRadius: "10px",
					marginLeft: "1rem",
					padding: "1.5rem 2.5rem",
					paddingLeft: "1rem",
					color: "white",
					display: "flex",
					gap: "1rem"
				}}
			>
				<LucidePencilLine />
				<span style={{ fontWeight: 600 }}>Add {itemTemplate.name}</span>{" "}
			</Action.Default>
		</S.Wrapper>
	);
}
