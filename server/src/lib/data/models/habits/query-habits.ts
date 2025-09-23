import type { Habit } from "@shared/lib/schemas/habit";
import type { HabitTagRelation } from "@shared/types/data/relational.types";
import type { ID } from "@shared/types/data/utility.types";
import type { QueryFunction } from "types/sql.types";
import { TABLES } from "types/tables";
import { sqlConnection } from "@/db/init";

export const queryHabitsByUser: QueryFunction<
	{ user_id: ID },
	Promise<Habit[]>
> = async ({ sql = sqlConnection, user_id }) => {
	return sql<Habit[]>`
      select * from ${sql(TABLES.HABITS)} 
      where user_id = ${user_id}
   `;
};

export const queryHabitTagsByUser: QueryFunction<
	{ user_id: ID },
	Promise<HabitTagRelation[]>
> = async ({ sql = sqlConnection, user_id }) => {
	return sql<HabitTagRelation[]>`
      select * from ${sql(TABLES.HABITS_TAGS)} 
      where user_id = ${user_id}
   `;
};
