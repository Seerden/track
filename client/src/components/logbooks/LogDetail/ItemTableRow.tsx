import { FieldWrapper } from "@/components/logbooks/LogDetail/style/_common.style";
import type { FieldTemplateWithValue } from "./lib/has-values";
import S from "./style/ItemTableRow";

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
					<FieldWrapper $small>
						{field.value} {field.unit}
					</FieldWrapper>
				</S.Field>
			))}
		</tr>
	);
}
