import type { Tag } from "@shared/lib/schemas/tag";
import type { ID } from "@shared/types/data/utility.types";
import { TABLES } from "types/tables";
import { userOwnsTag } from "@/lib/data/models/tags/utility/user-owns-tag";
import { createTransaction, query } from "@/lib/query-function";

export const deleteTagById = query(
	async ({ tag_id, user_id }: { tag_id: ID; user_id: ID }) => {
		return await createTransaction(async (sql) => {
			if (!(await userOwnsTag({ user_id, tag_id }))) {
				throw new Error(`User ${user_id} does not own tag ${tag_id}`);
			}

			return await sql<Pick<Tag, "tag_id">[]>`
            delete from ${sql(TABLES.tags)}
               where tag_id = ${tag_id}
               and user_id = ${user_id}
            returning tag_id
         `;
		});
	}
);
