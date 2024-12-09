import NewFieldTemplate from "@/components/logbooks/NewFieldTemplate/NewFieldTemplate";
import MiniField from "@/components/logbooks/NewItemTemplate/MiniField";
import useNewItemTemplate from "@/components/logbooks/NewItemTemplate/useNewItemTemplate";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import F from "@/lib/theme/components/form/form.alternate.style";
import { font } from "@/lib/theme/font";
import type { ID } from "@t/data/utility.types";
import { LucideBookCopy } from "lucide-react";
import S from "./style/NewItemTemplate.style";

type NewItemTemplateProps = {
	logbook_id: ID;
};

/** Builds a new item template, along with new item templates.
 * @todo implement functionality to select existing field templates (this
 * requires backend work, too)
 * @todo enforce input names
 */
export default function NewItemTemplate({ logbook_id }: NewItemTemplateProps) {
	const {
		getFieldTemplateHandler,
		handleInputChange,
		newFieldTemplates,
		handleSubmit,
		itemTemplate
	} = useNewItemTemplate({ logbook_id });

	return (
		<F.Form style={{ maxWidth: "max-content" }} onSubmit={handleSubmit}>
			<F.FormTitle>
				<LucideBookCopy size={40} color="royalblue" /> New Item Template
			</F.FormTitle>

			<S.Fields>
				<S.Row>
					<F.Label>
						<span>name</span>
						<input name="name" type="text" onChange={handleInputChange} />
					</F.Label>
					<F.Label>
						<span>description</span>
						<input name="description" type="text" onChange={handleInputChange} />
					</F.Label>
				</S.Row>

				<S.Row>
					<F.Label>
						{/* TODO: this needs an explanation */}
						<span style={{ padding: 0 }}>singular?</span>
						<Checkbox
							name="standalone"
							onChange={handleInputChange}
							checked={itemTemplate.standalone}
						/>
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

			<F.Submit $color="darkBlue">save item template</F.Submit>
		</F.Form>
	);
}
