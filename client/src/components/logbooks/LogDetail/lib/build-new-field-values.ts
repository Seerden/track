import type { FieldTemplateWithMaybeValue } from "@/components/logbooks/logbook.types";
import type { NewFieldValue } from "@t/data/logbook.new.types";
import type { ID } from "@t/data/utility.types";

/** Helper function for useNewItemRow that wrangles data into the correct shape
 * to be submitted as NewFieldValue[]. */
export function buildNewFieldValuesFromEntries({
	entries,
	log_id
}: {
	entries: FieldTemplateWithMaybeValue[];
	log_id: ID;
}): NewFieldValue[] {
	return entries.map((entry) => {
		return {
			field_template_id: entry.field_template_id,
			// TODO: just parsing to null if undefined isn't the most robust way to
			// validate the data, but combined with the logic we use to determine
			// isSubmittable in the hook, it works well enough.
			value: entry.value ?? null,
			log_id
		};
	});
}
