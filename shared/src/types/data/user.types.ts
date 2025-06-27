import { z } from "zod";
import type { ID, Timestamp } from "./utility.types";

export const newUserSchema = z.object({
	username: z.string(),
	password: z.string(),
	email: z.string().email().optional(),
});

export type NewUser = z.infer<typeof newUserSchema>;

export type UserLogin = NewUser;

export type UserInput = Omit<NewUser, "password"> & {
	password_hash: string;
};

// TODO: never pass password_hash to the client
export type User = UserInput & {
	user_id: ID;
	created_at: Timestamp;
};
