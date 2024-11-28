import { FieldWrapper } from "@/components/logbooks/Logbooks/style/_common.style";
import type { Nullable } from "@t/data/utility.types";
import S from "./style/ItemRowCard.style";

export type Field = {
	fieldValueType: string;
	fieldValue: Nullable<string | number>;
	fieldName: string;
	fieldUnit: Nullable<string>;
};

export type ItemRowCardProps = {
	row: {
		fields: Field[];
	};
};

// rename to ItemTableRow and rename styled components too
export default function ItemRowCard({ row }: ItemRowCardProps) {
	const { fields } = row;

	return (
		<S.Card>
			{fields.map((field) => (
				<S.Field key={field.fieldName}>
					<FieldWrapper small>
						{field.fieldValue} {field.fieldUnit}
					</FieldWrapper>
				</S.Field>
			))}
		</S.Card>
	);
}
