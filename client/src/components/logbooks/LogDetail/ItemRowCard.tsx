import { FieldWrapper } from "@/components/logbooks/LogDetail/style/_common.style";
import type { FieldTemplate, FieldValue } from "@t/data/logbook.types";
import S from "./style/ItemRowCard.style";

export type ItemRowCardProps = {
	fields: (FieldTemplate & { value: FieldValue["value"] })[];
};

// rename to ItemTableRow and rename styled components too
export default function ItemRowCard({ fields }: ItemRowCardProps) {
	console.log({ fields });
	return (
		<S.Card>
			{fields.map((field) => (
				<S.Field key={field.name}>
					<FieldWrapper $small>
						{field.value} {field.unit}
					</FieldWrapper>
				</S.Field>
			))}
		</S.Card>
	);
}
