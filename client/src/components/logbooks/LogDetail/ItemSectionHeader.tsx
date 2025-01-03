import Containers from "@/lib/theme/components/container.style";
import T from "./style/ItemRow.style";
import S from "./style/ItemSectionHeader.style";

/** Header for the ItemRows table that displays the name of every field
("label"). */
export default function ItemSectionHeader({ labels }: { labels: string[] }) {
	return (
		<T.RowWrapper>
			{labels.map((label) => (
				<S.HeaderField key={label}>
					<Containers.Field $small>{label}</Containers.Field>
				</S.HeaderField>
			))}
		</T.RowWrapper>
	);
}
