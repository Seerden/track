import type { ById, ByIdMap } from "@shared/types/data/utility.types";

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
