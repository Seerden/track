import NewFieldTemplate from "@/components/logbooks/fields/NewFieldTemplate/NewFieldTemplate";
import MiniField from "@/components/logbooks/fields/NewItemTemplate/MiniField";
import F from "@/components/logbooks/LogbookForm/style/LogbookForm.style";
import { font } from "@/lib/theme/font";
import type { NewFieldTemplate as TNewFieldTemplate } from "@t/data/logbook.new.types";
import type { ID } from "@t/data/utility.types";
import { LucideBookCopy } from "lucide-react";
import { useState } from "react";
import S from "./style/NewItemTemplate.style";
type NewItemTemplateProps = {
	logbook_id: ID;
};

export default function NewItemTemplate({ logbook_id }: NewItemTemplateProps) {
	const [newFieldTemplates, setNewFieldTemplates] = useState<TNewFieldTemplate[]>([]);

	function getFieldTemplateHandler(position: number) {
		return (value: TNewFieldTemplate) =>
			setNewFieldTemplates((current) => {
				const newTemplates = [...current];
				newTemplates[position] = value;
				return newTemplates;
			});
	}

	return (
		<F.Form style={{ maxWidth: "max-content" }}>
			<F.FormTitle>
				<LucideBookCopy size={40} color="royalblue" /> New Item Template
			</F.FormTitle>

			<S.Fields>
				<S.Row>
					<F.Label>
						<span>name</span>
						<input name="name" type="text" />
					</F.Label>
					<F.Label>
						<span>description</span>
						<input name="description" type="text" />
					</F.Label>
				</S.Row>

				<S.Row>
					<F.Label>
						{/* TODO: this needs an explanation */}
						<span style={{ padding: 0 }}>singular?</span>
						<input name="standalone" type="checkbox" />
					</F.Label>
				</S.Row>
			</S.Fields>

			<S.FieldTemplatesWrapper>
				{newFieldTemplates.length ? (
					<S.FieldTemplates>
						{newFieldTemplates.map((fieldTemplate, i) => (
							<MiniField key={i} fieldTemplate={fieldTemplate} />
						))}
					</S.FieldTemplates>
				) : (
					<p style={{ fontSize: font.size["0.9"], marginBottom: "1.5rem" }}>
						This item template does not have any fields yet. Add one below.
					</p>
				)}
				<NewFieldTemplate
					key={newFieldTemplates.length}
					logbook_id={logbook_id}
					position={newFieldTemplates.length}
					onFieldTemplateAdd={getFieldTemplateHandler(newFieldTemplates.length)}
				/>
			</S.FieldTemplatesWrapper>

			<F.Submit $iconPosition="right">save item template</F.Submit>
		</F.Form>
	);
}
