import { isNullish } from "@shared/lib/is-nullish";
import type { Tag } from "@shared/lib/schemas/tag";
import type { ID } from "@shared/types/data/utility.types";
import { TABLES } from "types/tables";
import { query } from "@/lib/query-function";

export const userOwnsTag = query(
	async (sql, { user_id, tag_id }: { user_id: ID; tag_id: ID }) => {
		const [tag] = await sql<Pick<Tag, "tag_id" | "user_id">[]>`
      select tag_id, user_id from ${sql(TABLES.tags)}
      where user_id = ${user_id}
      and tag_id = ${tag_id}
   `;

		return !isNullish(tag) && tag.tag_id === tag_id && tag.user_id === user_id;
	}
);
