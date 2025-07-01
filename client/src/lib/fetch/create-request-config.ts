import { deleteConfig, postConfig, putConfig } from "./fetch-constants";

/** Add data to the request body only if data exists. */
function maybeWithBody<T>(config: RequestInit, data?: T): RequestInit {
	return {
		...config,
		...(data && { body: JSON.stringify(data) })
	};
}

function createPostConfig<T>(data?: T): RequestInit {
	return maybeWithBody(postConfig, data);
}

function createPutConfig<T>(data?: T): RequestInit {
	return maybeWithBody(putConfig, data);
}

function createDeleteConfig<T>(data?: T): RequestInit {
	return maybeWithBody(deleteConfig, data);
}

// TODO TRK-228: this is obsolete now, no?
export const createRequestConfig = {
	post: createPostConfig,
	put: createPutConfig,
	delete: createDeleteConfig
};
