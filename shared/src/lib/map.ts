import { DataById, MappedData } from "types/data/map";
import { ID } from "types/data/utility.types";

/** Transform the byId object of a DataById object to a Map.
 * @note the solution above means we don't have to cast the return value, but
 * because it still casts the Object.entries(), it's not more type-safe than
 * the solution below, which is simpler in my opinion. I'm leaving it up there
 * because I think it's a cool example of `infer`.
 */
export function transformByIdToMap<T extends DataById<unknown>>(
	data: T,
): MappedData<T> {
	const byId = new Map(Object.entries(data.byId));

	return Object.assign({}, data, { byId }) as MappedData<T>;
}

/** Transforms a byId Map to a list containing `byId`'s values. */
export function byIdAsList<T>(map?: Map<ID, T>): T[] {
	if (!map) return [];
	return [...map.values()];
}
