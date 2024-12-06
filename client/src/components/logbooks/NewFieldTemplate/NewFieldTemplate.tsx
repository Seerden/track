import F from "@/components/logbooks/LogbookForm/style/LogbookForm.style";
import useNewFieldTemplate from "@/components/logbooks/NewFieldTemplate/useNewFieldTemplate";
import { font } from "@/lib/theme/font";
import type { NewFieldTemplate as TNewFieldTemplate } from "@t/data/logbook.new.types";
import type { ID } from "@t/data/utility.types";
import { LucideListPlus } from "lucide-react";
import S from "./style/NewFieldTemplate.style";

type NewFieldTemplateProps = {
	position: number;
	logbook_id: ID;
	onFieldTemplateAdd: (value: TNewFieldTemplate) => void;
};

export default function NewFieldTemplate({
	position,
	logbook_id,
	onFieldTemplateAdd
}: NewFieldTemplateProps) {
	const { fieldTemplate, handleInputChange } = useNewFieldTemplate({
		position,
		logbook_id
	});

	return (
		// name, description, unit, value_type, required
		<S.Wrapper
			style={{
				display: "flex",
				flexDirection: "column"
			}}
		>
			<S.Fields>
				<S.Title>New Field</S.Title>

				<S.Column>
					<S.Label>
						<span>name</span>
						<input name="name" type="text" onChange={handleInputChange} />
					</S.Label>

					<S.Label>
						<span>description</span>
						<input name="description" type="text" onChange={handleInputChange} />
					</S.Label>
				</S.Column>

				<S.Column>
					<S.Label>
						<span>value type</span>
						<select name="value_type" onChange={handleInputChange}>
							<option value="number">number</option>
							<option value="text">text</option>
							<option value="richtext">rich text</option>
						</select>
					</S.Label>

					<S.Label>
						<span>unit (optional)</span>
						<input name="unit" type="text" onChange={handleInputChange} />
					</S.Label>
				</S.Column>

				<S.Column style={{ alignSelf: "flex-end" }}>
					<S.Label>
						<span>required?</span>
						<input
							name="required"
							type="checkbox"
							checked={fieldTemplate.required}
							onChange={handleInputChange}
						/>
					</S.Label>
				</S.Column>
			</S.Fields>

			<F.Submit
				$iconPosition="right"
				$color="themeInverted"
				type="button"
				style={{
					fontSize: font.size["0.86"],
					margin: 0,
					marginTop: "1rem",
					alignSelf: "flex-end"
				}}
				onClick={(e) => {
					e.preventDefault();
					onFieldTemplateAdd(fieldTemplate);
				}}
			>
				add field <LucideListPlus size={20} />
			</F.Submit>
		</S.Wrapper>
	);
}