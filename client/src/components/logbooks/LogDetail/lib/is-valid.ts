import type { FieldTemplateWithValue } from "@/components/logbooks/LogDetail/useNewItemRow";

/** Helper for useNewItemRow that determines whether an input is valid according
 * to the settings specified by its `FieldTemplateWithValue`. */
export function isValidEntry(entry: FieldTemplateWithValue | undefined) {
	if (!entry) return false;
	if (entry.required || entry.value) {
		return (entry.value ?? "").toString().length > 0;
	}
	return true;
}

/** Similar to `isValidEntry`, except applies the logic to every input in the row.
 * */
export function isValidRow(entries: FieldTemplateWithValue[]) {
	return entries.every((entry) => isValidEntry(entry));
}
