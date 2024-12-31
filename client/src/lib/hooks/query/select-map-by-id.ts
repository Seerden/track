import type { DataById, MappedData } from "@/types/query.types";

// export default function transformByIdToMap<T extends DataById<unknown>>(
// 	data: T
// ): MappedData<T> {
// 	type ValueType = T extends DataById<infer U> ? U : never;
// 	const byId = new Map(Object.entries(data.byId) as [string, ValueType][]);
// 	return Object.assign({}, data, { byId });
// }

/** Transform the byId object of a DataById object to a Map.
 * @note the solution above means we don't have to cast the return value, but
 * because it still casts the Object.entries(), it's not more type-safe than
 * the solution below, which is simpler in my opinion. I'm leaving it up there
 * because I think it's a cool example of `infer`.
 */
export default function transformByIdToMap<T extends DataById<unknown>>(
	data: T
): MappedData<T> {
	const byId = new Map(Object.entries(data.byId));

	return Object.assign({}, data, { byId }) as MappedData<T>;
}
