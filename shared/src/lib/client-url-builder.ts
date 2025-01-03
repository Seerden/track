/*
   In this file, we create a function that takes a path, e.g.
   "/logbooks/:logbook_id/items/:item_id" and returns the following:
   - serverPath: "/:logbook_id/items/:item_id"
   - makeClientPath: 
      ({logbook_id: string, item_id: string}) =>
         `/${logbook_id}/items/${item_id}`
      This way, we don't have to separately define, in the client, the urls for
      the server endpoints.
*/

/**
 * This type extracts the route params (as a union of string) from a route path.
 * @example ExtractParams<"/logbooks/:logbook_id/items/:item_id">
 * results in "logbook_id" | "item_id"
 */
type ExtractParams<Path extends string> =
	Path extends `${infer _Prefix}:${infer Param}/${infer Rest}`
		? Param | ExtractParams<`/${Rest}`>
		: Path extends `${infer _Prefix}:${infer Param}`
			? Param
			: never;

/**
 * Given a path that represents an route (as expected by express) with params,
 * and a `prefix` that will be prepended to the path (used in the client, so
 * that it accounts for subrouter paths), this function returns an object with
 * the server path and a typed function to create the client path using the
 * necessary params as arguments.
 * @example
 *  calling matchPaths("/logbooks/:logbook_id/items/:item_id")
 *  returns {
 *     serverPath: "/:logbook_id/items/:item_id",
 *     makeClientPath: (params: {logbook_id: string, item_id: string}) => `/${logbook_id}/items/${item_id}`
 *  }
 */
export function clientUrlBuilder<Path extends string>(
	serverPath: Path,
	prefix: Path,
) {
	const makeClientPath = (params: { [K in ExtractParams<Path>]: string }) => {
		let path: string = serverPath;
		for (const key of Object.keys(params) as Array<ExtractParams<Path>>) {
			path = path.replace(`:${key}`, params[key as ExtractParams<Path>]);
		}
		return `${prefix}${path}`;
	};

	return { serverPath, makeClientPath };
}
