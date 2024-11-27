import { createRequestConfig } from "@/lib/fetch/create-request-config";
import { makeAuthorizedUrl } from "@/lib/fetch/make-authorized-url";

async function apiGet<T>({ url }: { url: string }): Promise<T> {
	const _url = makeAuthorizedUrl(url);
	const response: Promise<T> = (
		await fetch(_url, {
			credentials: "include",
			method: "GET"
		})
	).json();

	return response;
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
		const response: Promise<TResponse> = (
			await fetch(_url, configFunction(body))
		).json();
		return response;
	};
}

const apiPost = apiUpdate("post");
const apiPut = apiUpdate("put");

function apiDelete<T>({ url }: { url: string }): Promise<T> {
	const _url = makeAuthorizedUrl(url);
	return (async () => (await fetch(_url, createRequestConfig.delete())).json())();
}

const api = {
	get: apiGet,
	post: apiPost,
	put: apiPut,
	delete: apiDelete
};

export default api;
