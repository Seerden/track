import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import type { HabitWithPossiblySyntheticEntries } from "@shared/lib/schemas/habit";
import type { ID, Nullable } from "@shared/types/data/utility.types";
import type { TagFilter } from "@/components/activities/ActivityFilter/tag-filter.atom";

const tagPredicates = {
	includes: (
		thing: PossiblySyntheticActivity | HabitWithPossiblySyntheticEntries,
		tag_ids: Nullable<ID[]>,
		exact?: boolean
	) => {
		if (!tag_ids?.length) return true;

		return exact
			? tag_ids.every((tag_id) => thing.tag_ids.includes(tag_id))
			: tag_ids.some((tag_id) => thing.tag_ids.includes(tag_id));
	},

	excludes: (
		thing: PossiblySyntheticActivity | HabitWithPossiblySyntheticEntries,
		tag_ids: Nullable<ID[]>,
		exact?: boolean
	) => {
		if (!tag_ids?.length) return true;

		// TODO: (TRK-297) the non-exact case does not work as intended.
		return exact
			? !tag_ids.every((tag_id) => thing.tag_ids.includes(tag_id))
			: !tag_ids.some((tag_id) => !thing.tag_ids.includes(tag_id));
	},
};

export function filterByTags<
	T extends PossiblySyntheticActivity | HabitWithPossiblySyntheticEntries,
>(things: T[], filter: TagFilter) {
	const predicate = tagPredicates[filter.type];
	return things.filter((thing) => predicate(thing, filter.value, filter.exact));
}
