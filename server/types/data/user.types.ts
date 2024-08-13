import { Timestamp } from "./utility.types";

export type User = {
	user_id: number;
	username: string;
	email?: string;
	password_hash: string;
	created_at: Timestamp;
};
