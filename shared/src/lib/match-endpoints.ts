// TODO: the entrypoint for shared/ is the types folder, so we need to change
// some things around if we want to expose this /lib folder to the client and
// server.

// The goal here is to create a function that takes a path, e.g.
// "/logbooks/:logbook_id/items/:item_id" and returns the following:
// - serverPath: "/:logbook_id/items/:item_id"
// - makeClientPath: ({logbook_id: string, item_id: string}) =>
//    `/${logbook_id}/items/${item_id}`

type ExtractParams<Path extends string> =
	Path extends `${infer _Prefix}:${infer Param}/${infer Rest}`
		? Param | ExtractParams<`/${Rest}`>
		: Path extends `${infer _Prefix}:${infer Param}`
			? Param
			: never;

/**
 * @example
 *  matchPaths("/logbooks/:logbook_id/items/:item_id")
 *  returns {
 *     serverPath: "/:logbook_id/items/:item_id",
 *     makeClientPath: (params: {logbook_id: string, item_id: string}) => `/${logbook_id}/items/${item_id}`
 *  }
 */
export function matchPaths<Path extends string>(
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
