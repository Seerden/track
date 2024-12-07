import useNewItemRow from "@/components/logbooks/LogDetail/hooks/useNewItemRow";
import S from "@/components/logbooks/LogDetail/style/ItemTableRow.style";
import Containers from "@/lib/theme/components/container.style";
import UnstyledInput from "@/lib/theme/components/input/UnstyledInput.style";
import type { FieldTemplate, Item } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";

interface NewItemRowProps {
	position: number;
	item: Item;
	fieldTemplates: FieldTemplate[];
	log_id: ID;
}

export default function NewItemRow({
	position,
	item,
	fieldTemplates,
	log_id
}: NewItemRowProps) {
	const { handleRowBlur, entries, handleInputChange, isValidEntry } = useNewItemRow({
		position,
		item,
		fieldTemplates,
		log_id
	});

	return (
		<tr>
			{fieldTemplates.map((template, index) => (
				<S.Field key={template.field_template_id} style={{ position: "relative" }}>
					<Containers.Field
						$small
						style={{
							// TODO: if we end up combining ItemRowCard and NewItemRow,
							// only provide an outline to a field if it changed.
							outlineColor: isValidEntry(entries.at(index)) ? "green" : "red"
						}}
					>
						<UnstyledInput
							// TODO: instead of doing a number input, do a text input and
							// apply handlers for non-text types (e.g. number)
							type={template.value_type} // TODO: handle rich text separately everywhere
							placeholder={template.name}
							style={{
								// TODO: this width could be static, but needs a
								// reasonable value. Does not work statically like this
								// when we also render the unit
								width: "100px"
							}}
							onChange={(e) => handleInputChange(e, index)}
							onBlur={handleRowBlur}
						/>
						{!!template.unit && <span>{template.unit}</span>}
					</Containers.Field>
				</S.Field>
			))}
		</tr>
	);
}
