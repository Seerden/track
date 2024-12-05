import { FieldWrapper } from "@/components/logbooks/LogDetail/style/_common.style";
import S from "./style/ItemRowsTableHeader.style";

/** Header for the ItemRows table that displays the name of every field
("label"). */
export default function ItemRowsTableHeader({ labels }: { labels: string[] }) {
	return (
		<thead>
			{labels.map((label) => (
				<S.HeaderField key={label}>
					<FieldWrapper $small>{label}</FieldWrapper>
				</S.HeaderField>
			))}
		</thead>
	);
}
