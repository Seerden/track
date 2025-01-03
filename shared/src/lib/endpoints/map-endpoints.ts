import {
	ServerSubServiceMap,
	SubService,
} from "lib/endpoints/logbooks-endpoints";

/** This function maps the given object of handlers by method, using the given endpoints,
 * to a ServerSubServiceMap.
 * @todo I think we could use this in both the client and server, if we pass a
 * generic for the handler type. Let's try.
 * @usage
 * ```
 *  const _logbooks = mapEndpoints(logbookEndpointsService.logbooks, {
 *     get: {
 *        getByUser: getLogbooks,
 *        getById: getLogbook,
 *     },
 *     post: {
 *        post: postLogbook,
 *     },
 *     put: {
 *        put: putLogbook,
 *     },
 *     delete: {
 *        delete: deleteLogbook,
 *     },
 *  });
 * ```
 */
export function mapEndpoints<T extends SubService>(
	endpoints: T,
	handlers: { [M in keyof T]: { [K in keyof T[M]]: Function } },
): ServerSubServiceMap<T> {
	const result: Partial<ServerSubServiceMap<T>> = {};

	for (const method in endpoints) {
		result[method as keyof T] = {} as Partial<ServerSubServiceMap<T>>[keyof T];

		for (const routeKey in endpoints[method]) {
			// @ts-ignore -- I can't be bothered to figure this out.
			result[method][routeKey] = {
				path: endpoints[method][routeKey],
				handler: handlers[method][routeKey],
			};
		}
	}

	return result as ServerSubServiceMap<T>;
}
