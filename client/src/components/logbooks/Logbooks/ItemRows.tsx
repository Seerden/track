import ItemHeader from "@/components/logbooks/Logbooks/ItemHeader";
import type { ItemRowCardProps } from "@/components/logbooks/Logbooks/ItemRowCard";
import ItemRowCard from "@/components/logbooks/Logbooks/ItemRowCard";
import { Action } from "@/lib/theme/components/buttons";
import { LucidePencil } from "lucide-react";
import S from "./style/ItemRows.style";

type Row = ItemRowCardProps["row"];
export type ItemRowsProps = {
	rows: Row[];
	item: {
		name: string;
	};
};

export default function ItemRows({ rows, item }: ItemRowsProps) {
	return (
		<S.Wrapper>
			<S.ItemName>{item.name}</S.ItemName>
			<div>
				<S.Table>
					<ItemHeader fields={rows[0].fields} />
					{rows.map((row, index) => (
						<ItemRowCard key={index} row={row} />
					))}
				</S.Table>
				<Action.Default
					$color="yellow"
					style={{
						color: "black",
						borderRadius: 5,
						width: "max-content",
						padding: "0.5rem 1rem",
						paddingLeft: "0.5rem",
						marginTop: "0.5rem",
						marginLeft: "1rem",
						display: "flex",
						gap: "1rem"
					}}
				>
					<LucidePencil /> add to {item.name}
				</Action.Default>
			</div>
		</S.Wrapper>
	);
}
