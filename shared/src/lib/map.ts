import { DataById, MappedData } from "@shared/types/data/map";
import {
	type ById,
	type ByIdMap,
	type MapById,
} from "@shared/types/data/utility.types";

/** Transform the byId object of a DataById object to a Map.
 * @note the solution above means we don't have to cast the return value, but
 * because it still casts the Object.entries(), it's not more type-safe than
 * the solution below, which is simpler in my opinion. I'm leaving it up there
 * because I think it's a cool example of `infer`.
 * @todo TRK-228: we don't use the DataById type expicitly anywhere anymore,
 * same goes for MappedData, so we can hardcode them here.
 * @deprecated @todo TRK-249 just use the map, don't nest it under .byId
 */
export function transformByIdToMap<T extends DataById<unknown>>(
	data: T,
): MappedData<T> {
	const byId = new Map(Object.entries(data.byId));

	return Object.assign({}, data, { byId }) as MappedData<T>;
}

/** Transforms a byId Map to a list containing `byId`'s values. */
export function byIdAsList<T>(map?: MapById<T>): T[] {
	if (!map) return [];
	return [...map.values()];
}

type IdFieldUnion<T> = {
	[K in keyof T]: K extends `${string}_id` ? K : never;
}[keyof T];

/** Reduces a list of objects that share an *_id field into a Record<ID,
 * object>. */
export function groupById<T extends object>(
	data: T[],
	idField: IdFieldUnion<T>,
): ById<T> {
	const byIdMap = data.reduce((acc, cur) => {
		const id = cur[idField];
		acc.set(id as string, cur);
		return acc;
	}, new Map() as ByIdMap<T>);

	return Object.fromEntries(byIdMap.entries()) as ById<T>;
}

/** Reduces a list of objects that share an *_id field into a map by id using
 * the specified id field as keys. */
export function mapById<T extends object>(
	data: T[],
	idField: IdFieldUnion<T>,
): ByIdMap<T> {
	const byIdMap = data.reduce((acc, cur) => {
		const id = cur[idField];
		acc.set(id as string, cur);
		return acc;
	}, new Map() as ByIdMap<T>);

	return byIdMap;
}
