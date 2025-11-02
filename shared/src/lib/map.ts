import type { DataById, MappedData } from "@shared/types/data/map";
import type {
	ById,
	ByIdMap,
	ID,
	MapById,
} from "@shared/types/data/utility.types";
import { z } from "./zod";

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
	data: T
): MappedData<T> {
	const byId = new Map(Object.entries(data.byId));

	return Object.assign({}, data, { byId }) as MappedData<T>;
}

/** Transforms a byId Map to a list containing `byId`'s values. */
export function byIdAsList<T>(map?: MapById<T>): T[] {
	if (!map?.size) return [];
	return [...map.values()];
}

type IdFieldUnion<T> = {
	[K in keyof T]: K extends `${string}_id` ? K : never;
}[keyof T];

/** Reduces a list of objects that share an *_id field into a Record<ID,
 * object>. */
export function groupById<T extends object>(
	data: T[],
	idField: IdFieldUnion<T>
): ById<T> {
	const byIdMap = data.reduce(
		(acc, cur) => {
			const id = cur[idField];
			acc.set(id as string, cur);
			return acc;
		},
		new Map() as ByIdMap<T>
	);

	return Object.fromEntries(byIdMap.entries()) as ById<T>;
}

/** Reduces a list of objects that share an *_id field into a map by id using
 * the specified id field as keys. */
export function mapById<T extends object>(
	data: T[],
	idField: IdFieldUnion<T>
): ByIdMap<T> {
	const byIdMap = data.reduce(
		(acc, cur) => {
			const id = cur[idField];
			acc.set(id as string, cur);
			return acc;
		},
		new Map() as ByIdMap<T>
	);

	return byIdMap;
}

/** Given an array of objects of type T, an idField of T (like user_id) whose value
 * is a string, and another property `extractField` in T whose values we want to
 * group by idField, create a Map<idField, extractField[]>.
 * @example given a list of activities with tag_ids, group the tag_ids by
 * activity.recurrence_id. */
export function arrayMapById<T extends object, U extends keyof T>(
	data: T[],
	idField: IdFieldUnion<T>,
	// pick one of the fields of T, the returned map will hold values that are an
	// array of that property
	extractField: U
): Map<ID, T[U][]> {
	if (!idField.endsWith("_id")) {
		throw new Error(`idField '${idField}' is not an id field`);
	}

	return data.reduce((acc, cur) => {
		if (!cur[idField]) return acc;

		const idPropertyParsed = z.string().safeParse(cur[idField]);

		if (!idPropertyParsed.success) return acc;
		const idProperty = idPropertyParsed.data;

		const groupedValues = acc.get(idProperty) ?? [];
		acc.set(idProperty, groupedValues.concat(cur[extractField]));
		return acc;
	}, new Map<string, T[U][]>());
}
