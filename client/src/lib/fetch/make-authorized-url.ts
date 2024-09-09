import { localUser } from "../user-storage";
import { baseUrl } from "./fetch-constants";

export function makeAuthorizedUrl(url: string) {
	const params = new URLSearchParams({ user_id: `${localUser.get()?.user_id}` });

	return `${baseUrl}${url}${params}`;
}
