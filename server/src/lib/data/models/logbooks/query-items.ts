import { sqlConnection } from "@/db/init";
import type { Item } from "@t/data/logbook.types";
import type { QueryFunction } from "types/sql.types";

export const queryItemsByLogbook: QueryFunction<
	{ logbook_id: number },
	Promise<Item[]>
> = async ({ sql = sqlConnection, logbook_id }) => {
	const items = await sql<[Item]>`
      SELECT * FROM items
      WHERE logbook_id = ${logbook_id}
   `;

	return items;
};
