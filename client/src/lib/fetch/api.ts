import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { makeAuthorizedUrl } from "@/lib/fetch/make-authorized-url";
import { captureEvent } from "@sentry/react";

function sentryApiError(errorBody: string, method: string, responseJson: unknown) {
	const error = new Error(errorBody);
	captureEvent({
		message: `api.${method} returned an error`,
		level: "error",
		extra: {
			response: responseJson,
			error
		}
	});
	throw error;
}

async function apiGet<T>({ url }: { url: string }): Promise<T> {
	const _url = makeAuthorizedUrl(url);
	const response = await fetch(_url, {
		credentials: "include",
		method: "GET"
	});

	if (!response.ok) {
		const responseJson = await response.json();
		const errorBody = "api.get returned an error";
		sentryApiError(errorBody, "get", responseJson);
		throw new Error("api.get returned an error");
	}

	return response.json() as T;
}

function apiUpdate(method: "put" | "post") {
	const configFunction = createRequestConfig[method];

	return async <TInput, TResponse>({
		url,
		body
	}: {
		url: string;
		body: TInput;
	}): Promise<TResponse> => {
		const _url = makeAuthorizedUrl(url);
		const response = await fetch(_url, configFunction(body));

		if (!response.ok) {
			const responseJson = await response.json();
			const errorBody = `api.${method} returned an error`;
			sentryApiError(errorBody, method, responseJson);
			throw new Error(`api.${method} returned an error`);
		} else {
			return response.json() as TResponse;
		}
	};
}

async function apiDelete<T>({ url }: { url: string }): Promise<T> {
	const _url = makeAuthorizedUrl(url);
	return (await fetch(_url, createRequestConfig.delete())).json() as T;
}

const api = {
	get: apiGet,
	post: apiUpdate("post"),
	put: apiUpdate("put"),
	delete: apiDelete
};

export default api;
