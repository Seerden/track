import { postConfig } from "./fetch-constants";

export function createPostConfig<T>(data?: T): RequestInit {
	return {
		...postConfig,
		...(data && { body: JSON.stringify(data) }),
	};
}
