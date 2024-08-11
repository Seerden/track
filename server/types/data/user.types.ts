import { Timestamp } from "./utility.types";

// THIS IS A WORK IN PROGRESS
export type User = {
	user_id: number;
	username: string;
	email?: string;
	password_hash: string;
	created_at: Timestamp;
};
