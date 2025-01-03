import api from "@/lib/fetch/api";
import { localUser } from "@/lib/user-storage";
import type { UserData } from "@/types/data.types";
import type { Data } from "@/types/query.types";
import type { NewUser, User, UserLogin } from "@shared/types/data/user.types";

async function postLogin(user: UserLogin) {
	return api.post<{ user: UserLogin }, Data<"user", User>>({
		url: "/auth/login",
		body: { user }
	});
}

async function postLogout() {
	return api.post<unknown, unknown>({ url: "/auth/logout", body: {} });
}

async function postRegister(newUser: NewUser) {
	return api.post<{ newUser: NewUser }, UserData>({
		url: "/auth/register",
		body: { newUser }
	});
}

async function getMe() {
	const data = await api.get<UserData>({ url: "/auth/me" });

	if (data.user) {
		localUser.set(data.user);
	} else {
		localUser.destroy();
	}

	return data;
}

const userService = {
	login: postLogin,
	logout: postLogout,
	register: postRegister,
	getMe
};

export default userService;
