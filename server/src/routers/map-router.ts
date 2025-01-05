import type { MappedService, Method } from "@shared/lib/endpoints/endpoint.types";
import type { RequestHandler, Router } from "express";

export function mapServiceToRouter({
	mappedService,
	router,
}: {
	// TODO: figure out how to neatly specify the generic here later -- could do
	// something like an ExistingService type that's a union of the services, and
	// then to MappedService<ExistingService>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mappedService: MappedService<Record<string, any>>;
	router: Router;
}) {
	for (const group of Object.values(mappedService)) {
		for (const [method, byMethod] of Object.entries(group)) {
			for (const [_routeKey, { path, handler }] of Object.entries(byMethod)) {
				router[method as Method](path, handler as RequestHandler);
			}
		}
	}
}
