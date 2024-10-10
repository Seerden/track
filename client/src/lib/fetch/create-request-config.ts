import { postConfig, putConfig } from "./fetch-constants";

export function createPostConfig<T>(data?: T): RequestInit {
	return {
		...postConfig,
		...(data && { body: JSON.stringify(data) }),
	};
}

function createPutConfig<T>(data?: T): RequestInit {
	return {
		...putConfig,
		...(data && { body: JSON.stringify(data) }),
	};
}

export const createRequestConfig = {
	post: createPostConfig,
	put: createPutConfig,
};
