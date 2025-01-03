/** Checks for definite nullishness of a value */
export function missing<T>(
	value: T | null | undefined,
): value is undefined | null {
	return value === undefined || value === null;
}
