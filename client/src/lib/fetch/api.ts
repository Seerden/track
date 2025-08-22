import { captureEvent } from "@sentry/react";

/**
 * @deprecated Need to implement a server-side version of this to call from
 * trpc resolvers, but we can still use a client-side handler for whatever error
 * type we return from there, that's why this is still here, for reference. */
export function sentryApiError(
	errorBody: string,
	method: string,
	responseJson: unknown
) {
	const error = new Error(errorBody);
	captureEvent({
		message: `api.${method} returned an error`,
		level: "error",
		extra: {
			response: responseJson,
			error,
		},
	});
	throw error;
}
