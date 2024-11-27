import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { makeAuthorizedUrl } from "@/lib/fetch/make-authorized-url";

async function apiGet<T>({ url }: { url: string }): Promise<T> {
	const _url = makeAuthorizedUrl(url);
	return (
		await fetch(_url, {
			credentials: "include",
			method: "GET"
		})
	).json() as T;
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
		return (await fetch(_url, configFunction(body))).json() as TResponse;
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
