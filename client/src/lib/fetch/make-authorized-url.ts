import { localUser } from "../user-storage";
import { baseUrl } from "./fetch-constants";

export function makeAuthorizedUrl(url: string) {
	const user_id = localUser.get()?.user_id;
	const params = user_id ? `?${new URLSearchParams({ user_id: String(user_id) })}` : "";

	return `${baseUrl}${url}?${params}`;
}
