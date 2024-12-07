import api from "@/lib/fetch/api";
import { localUser } from "@/lib/user-storage";
import type { UserData } from "@/types/data.types";
import type { Data } from "@/types/query.types";
import type { NewUser, User, UserLogin } from "@t/data/user.types";

export async function postLogin(user: UserLogin) {
	return api.post<{ user: UserLogin }, Data<"user", User>>({
		url: "/auth/login",
		body: { user }
	});
}

export async function postLogout() {
	return api.post<unknown, unknown>({ url: "/auth/logout", body: {} });
}

export async function postRegister(newUser: NewUser) {
	return api.post<{ newUser: NewUser }, UserData>({
		url: "/auth/register",
		body: { newUser }
	});
}

export async function getMe() {
	const data = await api.get<UserData>({ url: "/auth/me" });

	if (data.user) {
		localUser.set(data.user);
	} else {
		localUser.destroy();
	}

	return data;
}
