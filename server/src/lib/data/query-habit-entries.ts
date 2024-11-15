import { sqlConnection } from "@/db/init";
import type { RequestHandler } from "express";
import type { HabitEntry } from "types/data/habit.types";
import type { ById, ID } from "types/data/utility.types";
import type { WithSQL } from "types/sql.types";

export async function queryHabitEntriesByUser({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: ID }>) {
	return sql<HabitEntry[]>`select * from habit_entries where user_id = ${user_id}`;
}

type IdFieldUnion<T> = {
	[K in keyof T]: K extends `${string}_id` ? K : never;
}[keyof T];

function groupById<T extends object>(data: T[], idField: IdFieldUnion<T>): ById<T> {
	return data.reduce((acc, item) => {
		const a = item[idField] as number;
		acc[a] = item;
		return acc;
	}, {} as ById<T>);
}

export const getHabitEntriesByUser: RequestHandler = async (req, res) => {
	const user_id = req.session.user!.user_id;
	const habitEntries = await queryHabitEntriesByUser({ user_id });
	res.json({ byId: groupById(habitEntries, "habit_entry_id") });
};
