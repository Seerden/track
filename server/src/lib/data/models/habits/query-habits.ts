import type { Habit } from "@shared/lib/schemas/habit";
import type { HabitTagRelation } from "@shared/types/data/relational.types";
import type { ID } from "@shared/types/data/utility.types";
import { TABLES } from "types/tables";
import { query } from "@/lib/query-function";

export const queryHabitsByUser = query(
	async (sql, { user_id }: { user_id: ID }) => {
		return sql<Habit[]>`
         select * from ${sql(TABLES.HABITS)} 
         where user_id = ${user_id}
      `;
	}
);

export const queryHabitTagsByUser = query(
	async (sql, { user_id }: { user_id: ID }) => {
		return sql<HabitTagRelation[]>`
         select * from ${sql(TABLES.HABITS_TAGS)} 
         where user_id = ${user_id}
      `;
	}
);
