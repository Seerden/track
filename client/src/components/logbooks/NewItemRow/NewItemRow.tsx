import { FieldWrapper } from "@/components/logbooks/LogDetail/style/_common.style";
import S from "@/components/logbooks/LogDetail/style/ItemTableRow";
import useMutateNewItemRow from "@/lib/hooks/query/logbooks/useMutateNewItemRow";
import UnstyledInput from "@/lib/theme/components/input/UnstyledInput.style";
import type {
	FieldTemplate,
	FieldValue,
	Item,
	NewFieldValue
} from "@t/data/logbook.types";
import type { ID, Maybe } from "@t/data/utility.types";
import { useEffect, useState } from "react";

interface NewItemRowProps {
	position: number;
	item: Item;
	fieldTemplates: FieldTemplate[];
	log_id: ID;
}

type FieldTemplateWithValue = FieldTemplate & { value: Maybe<FieldValue["value"]> };

export default function NewItemRow({
	position,
	item,
	fieldTemplates,
	log_id
}: NewItemRowProps) {
	// TODO: right now I'm using an array here. Ideally, I think it would be more
	// like a ById object, but that would require more logic for the "position"
	// of each new item etc.
	const [entries, setEntries] = useState<FieldTemplateWithValue[]>(
		fieldTemplates.map((template) => ({ ...template, value: undefined }))
	);

	// TODO: remove this log
	useEffect(() => {
		console.log({ entries, name: item.name });
	}, [entries]);

	const { mutate: submit } = useMutateNewItemRow();

	function isValidEntry(entry: FieldTemplateWithValue | undefined) {
		if (!entry) return false;
		if (entry.required || entry.value) {
			return (entry.value ?? "").toString().length > 0;
		}
		return true;
	}

	const isValidRow = entries.every((entry) => isValidEntry(entry));

	function buildNewFieldValuesFromEntries(
		entries: FieldTemplateWithValue[]
	): NewFieldValue[] {
		return entries.map((entry) => {
			return {
				field_template_id: entry.field_template_id,
				value: entry.value ?? null, // TODO: just parsing to null if undefined isn't the best way to go about it
				log_id
			};
		});
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
		// TODO: value is now always a string, have to parse it
		// to match value_type
		const { value } = e.target;
		setEntries((current) => {
			const newEntries = [...current];
			const entry = newEntries[index];
			if (entry) {
				newEntries[index] = { ...entry, value };
			}
			return newEntries;
		});
	}

	return (
		<S.Card>
			{fieldTemplates.map((template, index) => (
				<S.Field key={template.field_template_id} style={{ position: "relative" }}>
					<FieldWrapper
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
								width: "100px"
							}}
							onChange={(e) => handleInputChange(e, index)}
							onBlur={() => {
								if (isValidRow) {
									// TODO: submit or update the row, depending on if it
									// exists already.
									const input = {
										newItemRow: {
											item_id: item.item_id,
											log_id,
											position
										},
										newFieldValues: buildNewFieldValuesFromEntries(entries)
									};

									submit(input);
								}
							}}
						/>
						{template.unit && <span>{template.unit}</span>}
					</FieldWrapper>
				</S.Field>
			))}
		</S.Card>
	);
}
