import type { User } from "../types/server/user.types";
import type { Maybe } from "../types/server/utility.types";

function setLocalUser(user: User) {
	if (!user) return;

	localStorage.setItem("user", JSON.stringify(user));
}

function getLocalUser(): Maybe<User> {
	const userString = localStorage.getItem("user");
	if (userString) {
		const parsedUser = JSON.parse(userString);
		if (parsedUser?.user_id) {
			return parsedUser;
		}
		return;
	}
	return;
}

function destroyLocalUser() {
	localStorage.removeItem("user");
}

export const localUser = {
	get: getLocalUser,
	set: setLocalUser,
	destroy: destroyLocalUser
};
