import { Timestamp } from "./utility.types";

export type NewUser = {
	username: string;
	password: string;
	email?: string;
};

export type UserInput = Omit<NewUser, "password"> & {
	password_hash: string;
};

export type User = UserInput & {
	user_id: number;
	created_at: Timestamp;
};
