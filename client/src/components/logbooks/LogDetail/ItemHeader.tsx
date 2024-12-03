import { FieldWrapper } from "@/components/logbooks/LogDetail/style/_common.style";
import type { FieldTemplate } from "@t/data/logbook.types";
import S from "./style/ItemHeader.style";

// TODO: rename this component to TableHeaderFieldNames or something
export default function ItemHeader({ fields }: { fields: FieldTemplate[] }) {
	return (
		<S.HeaderFields>
			{fields.map((field) => (
				<S.HeaderField key={field.name}>
					<FieldWrapper $small>{field.name}</FieldWrapper>
				</S.HeaderField>
			))}
		</S.HeaderFields>
	);
}
