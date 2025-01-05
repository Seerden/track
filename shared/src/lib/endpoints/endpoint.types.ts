/** the HTTP methods we use */
export type Method = "get" | "post" | "put" | "delete";

/** this represents the endpoint relative to the router itself. When consuming
 * it, don't forget to make it absolute where necessary!  */
type RelativePath = string;

/** @example { byUser: "/logbooks" } would be the value of a subservice.get  */
type SubServiceByMethod = Record<string, RelativePath>;
/** ^, but adapted for the server */
export type ServerSubServiceByMethod = Record<
	string,
	{
		path: string;
		handler: Function; // this is always a RequestHandler, but that isn't defined in /shared
	}
>;

/** represents the routes, grouped by method, for a subservice. These are
 * relative to the router itself, but not further subdivided (e.g. if we have a
 * logbooksRouter used at /data/logbooks, then each subservice in a service will
 * be relative to this, and e.g. the logs subservice won't be under
 * /data/logbooks/logs). */
export type SubService = Record<Method, SubServiceByMethod>;
/** ^, but adapted for the server */
export type ServerSubService = Record<Method, ServerSubServiceByMethod>;

/** this maps SubService to ServerSubService.
 * @example const _logbooks = ServerSubServiceMap<typeof logbookEndpointsService>
 * this will make sure all the keys are equal, then we can define the handlers
 */
export type ServerSubServiceMap<T extends SubService> = {
	[M in keyof T]: {
		[K in keyof T[M]]: {
			path: T[M][K];
			handler: Function;
		};
	};
};
