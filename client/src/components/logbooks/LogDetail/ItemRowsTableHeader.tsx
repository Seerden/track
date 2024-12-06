import Containers from "@/lib/theme/components/container.style";
import S from "./style/ItemRowsTableHeader.style";

/** Header for the ItemRows table that displays the name of every field
("label"). */
export default function ItemRowsTableHeader({ labels }: { labels: string[] }) {
	return (
		<thead>
			{labels.map((label) => (
				<S.HeaderField key={label}>
					<Containers.Field $small>{label}</Containers.Field>
				</S.HeaderField>
			))}
		</thead>
	);
}
