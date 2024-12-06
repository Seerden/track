import useNewItem from "@/components/logbooks/NewItem/useNewItem";
import MiniField from "@/components/logbooks/NewItemTemplate/MiniField";
import F from "@/lib/theme/components/form/form.alternate.style";
import type { ItemTemplate } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import { LucideNotebookText, LucideNotepadTextDashed } from "lucide-react";
import S from "./style/NewItem.style";

type NewItemProps = {
	logbook_id: ID;
	itemTemplate: ItemTemplate;
};

/** A NewItem form just displays the item template's fields, and allows the user
 *to specify a name. */
export default function NewItem({ itemTemplate, logbook_id }: NewItemProps) {
	const {
		isProbablySuspended,
		item,
		handleInputChange,
		handleSubmit,
		fieldsForItemTemplate
	} = useNewItem({ itemTemplate, logbook_id });

	if (isProbablySuspended) return null;

	return (
		<F.Form onSubmit={handleSubmit}>
			<F.FormTitle style={{ marginBottom: "1rem", paddingBottom: "0.5rem" }}>
				<LucideNotebookText size={40} color="royalblue" /> New Named{" "}
				<S.TextHighlight>{itemTemplate.name}</S.TextHighlight>
			</F.FormTitle>
			<p>
				The <span style={{ color: "blue" }}>{itemTemplate.name}</span> template
				contains the following fields:
			</p>
			<ul
				style={{
					display: "flex",
					flexDirection: "row",
					gap: "0.5rem",
					marginBottom: "1rem"
				}}
			>
				{fieldsForItemTemplate.map((field) => (
					// TODO: fieldTemplate={field} should not pass type check,
					// because field is Field, not FieldTemplate
					// TODO: extract MiniField to a shared place, and implement
					// another variant: one that includes not just the name, but also
					// the unit, value type etc.
					<MiniField key={field.field_template_id} fieldTemplate={field} />
				))}
			</ul>
			<F.Label style={{ width: 200 }}>
				<span>Name</span>
				<input type="text" name="name" onChange={handleInputChange} />
			</F.Label>
			<F.Submit
				$color="blue"
				disabled={!item.name.length}
				style={{
					width: 200,
					justifyContent: "space-between",
					marginLeft: 0 // TODO: why is there a default margin on this Submit? Remove it, apply it only when usecase needs it
				}}
			>
				Save item <LucideNotepadTextDashed size={20} />
			</F.Submit>
		</F.Form>
	);
}
