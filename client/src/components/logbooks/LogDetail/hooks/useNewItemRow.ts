import { buildNewFieldValuesFromEntries } from "@/components/logbooks/LogDetail/lib/build-new-field-values";
import { isValidEntry, isValidRow } from "@/components/logbooks/LogDetail/lib/is-valid";
import useMutateNewItemRow from "@/lib/hooks/query/logbooks/useMutateNewItemRow";
import type {
	FieldTemplate,
	FieldTemplateWithMaybeValue,
	Item
} from "@shared/types/data/logbook.types";
import type { ID } from "@shared/types/data/utility.types";
import { useState } from "react";

export default function useNewItemRow({
	item,
	position,
	fieldTemplates,
	log_id
}: {
	item: Item;
	position: number;
	fieldTemplates: FieldTemplate[];
	log_id: ID;
}) {
	const { mutate: submit } = useMutateNewItemRow();
	// TODO: right now I'm using an array here. Ideally, I think it would be more
	// like a ById object, but that would require more logic for the "position"
	// of each new item etc.
	const [entries, setEntries] = useState<FieldTemplateWithMaybeValue[]>(
		fieldTemplates.map((template) => Object.assign({}, template, { value: null }))
	);

	const isSubmittable = isValidRow(entries);

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
		// TODO: value is now always a string, we should parse it to match
		// value_type.
		const { value } = e.target;
		// TODO: make the following logic more immutable -- good time to try immer
		// for the first time!
		setEntries((current) => {
			const copy = [...current];
			const entry = copy[index];
			if (entry) {
				copy[index] = Object.assign({}, entry, { value });
			}
			return copy;
		});
	}

	// TODO: submit or update the row, depending on if it
	// exists already. Right now, only new rows are implemented (hence the name
	// of this hook 🫠)
	function handleRowBlur() {
		if (!isSubmittable) return;

		const input = {
			newItemRow: {
				item_id: item.item_id,
				log_id,
				position
			},
			newFieldValues: buildNewFieldValuesFromEntries({ entries, log_id })
		};

		submit(input);
	}

	return {
		isValidEntry,
		entries,
		handleInputChange,
		handleRowBlur
	};
}
