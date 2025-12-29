import type { Tag } from "@shared/lib/schemas/tag";
import type { ID } from "@shared/types/data/utility.types";
import { TABLES } from "types/tables";
import { query } from "@/lib/query-function";

export const deleteTagById = query(
	async (sql, { tag_id, user_id }: { tag_id: ID; user_id: ID }) => {
		return await sql<Pick<Tag, "tag_id">[]>`
      delete from ${sql(TABLES.tags)}
         where tag_id = ${tag_id}
         and user_id = ${user_id}
      returning tag_id
   `;
	}
);
