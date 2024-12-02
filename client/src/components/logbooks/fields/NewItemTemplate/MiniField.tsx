import type { NewFieldTemplate } from "@t/data/logbook.types";
import S from "./style/MiniField.style";

type MiniFieldProps = {
	fieldTemplate: NewFieldTemplate;
};

export default function MiniField({ fieldTemplate }: MiniFieldProps) {
	const { name, unit } = fieldTemplate;

	return (
		<S.Card>
			<span>
				{name} {unit && `(${unit})`}
			</span>
		</S.Card>
	);
}
