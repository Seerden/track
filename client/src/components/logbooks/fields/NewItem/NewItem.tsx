import MiniField from "@/components/logbooks/fields/NewItemTemplate/MiniField";
import F from "@/components/logbooks/LogbookForm/style/LogbookForm.style";
import useMutateNewItem from "@/lib/hooks/query/logbooks/useMutateNewItem";
import useQueryFields from "@/lib/hooks/query/logbooks/useQueryFields";
import type { ModalId } from "@/lib/modal-ids";
import modalIds from "@/lib/modal-ids";
import { queryClient } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import { useModalState } from "@/lib/state/modal-state";
import type { ItemTemplate, NewItem } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";
import { LucideNotebookText, LucideNotepadTextDashed } from "lucide-react";
import { useState } from "react";

type NewItemProps = {
	logbook_id: ID;
	itemTemplate: ItemTemplate;
};

/** A NewItem form just displays the item template's fields, and allows the user
 *to specify a name. */
export default function NewItem({ itemTemplate, logbook_id }: NewItemProps) {
	const { data: fieldsData } = useQueryFields();
	const [item, setItem] = useState<NewItem>({
		logbook_id,
		item_template_id: itemTemplate.item_template_id,
		name: ""
	});

	const { mutate: submit } = useMutateNewItem();
	const { closeModal } = useModalState();
	const modalId = `${modalIds.logbooks.item.new}-${itemTemplate.name}` as ModalId; // TODO: we use this in ItemSection, so it has to be in sync. We shouuld maek the template id part of hte value.

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setItem((cur) => ({ ...cur, [e.target.name]: e.target.value }));
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		submit(
			{ newItem: item },
			{
				onSuccess: () => {
					closeModal(modalId);
					// TODO: use a more fine-grained query key to invalidate
					queryClient.invalidateQueries({ queryKey: qk.logbooks.all, exact: false });
				}
			}
		);
	}

	if (!fieldsData) return null;
	const fieldsForItemTemplate = Object.values(fieldsData.byId).filter(
		// TODO: a case where we _have to_ parse an id to a number because as a
		// bigint, it comes in as a string -- see
		// https://github.com/Seerden/track/issues/175
		(field) => +field.item_template_id === +itemTemplate.item_template_id
	);

	return (
		<F.Form onSubmit={handleSubmit}>
			<F.FormTitle style={{ marginBottom: "1rem", paddingBottom: "0.5rem" }}>
				<LucideNotebookText size={40} color="royalblue" /> New Named{" "}
				<span
					style={{
						backgroundColor: "gold",
						padding: "0.25rem 0.5rem",
						borderRadius: "5px",
						color: "black",
						boxShadow: "0 1rem 0 -0.75rem goldenrod"
					}}
				>
					{itemTemplate.name}
				</span>
			</F.FormTitle>
			<p>
				{" "}
				The <span style={{ color: "blue " }}>{itemTemplate.name}</span> template
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
				$iconPosition="right"
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
