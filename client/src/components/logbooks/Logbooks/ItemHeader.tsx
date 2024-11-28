import type { Field } from "@/components/logbooks/Logbooks/ItemRowCard";
import { FieldWrapper } from "@/components/logbooks/Logbooks/style/_common.style";
import S from "./style/ItemHeader.style";

export default function ItemHeader({ fields }: { fields: Field[] }) {
	return (
		<S.HeaderFields>
			{fields.map((field) => (
				<S.HeaderField key={field.fieldName}>
					<FieldWrapper small>{field.fieldName}</FieldWrapper>
				</S.HeaderField>
			))}
		</S.HeaderFields>
	);
}
