import type { ById } from "@t/data/utility.types";

type IdFieldUnion<T> = {
	[K in keyof T]: K extends `${string}_id` ? K : never;
}[keyof T];

/** Reduces a list of objects that share an *_id field into a Record<ID,
 * object>. */
export function groupById<T extends object>(
	data: T[],
	idField: IdFieldUnion<T>,
): ById<T> {
	return data.reduce((acc, cur) => {
		const id = cur[idField] as number;
		acc[id] = cur;
		return acc;
	}, {} as ById<T>);
}
