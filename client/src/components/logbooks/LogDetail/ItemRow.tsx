import type { FieldTemplateWithValue } from "@/components/logbooks/logbook.types";
import Containers from "@/lib/theme/components/container.style";
import S from "./style/ItemRow";

export type ItemRowProps = {
	fields: FieldTemplateWithValue[];
};

/** Renders a single table row for an item: one cell for every `field` in
 * `fields`. */
export default function ItemRow({ fields }: ItemRowProps) {
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
