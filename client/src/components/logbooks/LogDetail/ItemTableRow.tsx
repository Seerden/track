import Containers from "@/lib/theme/components/container.style";
import type { FieldTemplateWithValue } from "./lib/has-values";
import S from "./style/ItemTableRow.style";

export type ItemRowCardProps = {
	fields: FieldTemplateWithValue[];
};

/** Renders a single table row for an item: one cell for every `field` in
 * `fields`. */
export default function ItemTableRow({ fields }: ItemRowCardProps) {
	return (
		<tr>
			{fields.map((field) => (
				<S.Field key={field.name}>
					<Containers.Field $small>
						{field.value} {field.unit}
					</Containers.Field>
				</S.Field>
			))}
		</tr>
	);
}
