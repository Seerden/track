import type { Timestamp } from "./utility.types";

export type NewUser = {
	username: string;
	password: string;
	email?: string;
};

export type UserLogin = NewUser;

export type UserInput = Omit<NewUser, "password"> & {
	password_hash: string;
};

// TODO: never pass password_hash to the client
export type User = UserInput & {
	user_id: number;
	created_at: Timestamp;
};
