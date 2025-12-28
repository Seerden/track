import { isNullish } from "@shared/lib/is-nullish";
import type { Tag } from "@shared/lib/schemas/tag";
import type { TagTagRelation } from "@shared/types/data/relational.types";
import type { ID } from "@shared/types/data/utility.types";
import { TABLES } from "types/tables";
import { linkTagToParent } from "@/lib/data/models/tags/insert-tags";
import { createTransaction, query } from "@/lib/query-function";

const userOwnsTag = query(
	async (sql, { user_id, tag_id }: { user_id: ID; tag_id: ID }) => {
		const [tag] = await sql<Pick<Tag, "tag_id" | "user_id">[]>`
      select tag_id, user_id from ${sql(TABLES.tags)}
      where user_id = ${user_id}
      and tag_id = ${tag_id}
   `;

		return !isNullish(tag) && tag.tag_id === tag_id && tag.user_id === user_id;
	}
);

const unlinkParentTag = query(
	async (sql, { tag_id, user_id }: { tag_id: ID; user_id: ID }) => {
		return await sql<TagTagRelation[]>`
         delete from ${sql(TABLES.tagsTags)}
         where child_id = ${tag_id}
         and user_id = ${user_id}
         returning *
      `;
	}
);

export const updateTag = query(
	async ({
		tag,
		parent_id,
		user_id,
	}: {
		tag: Tag;
		parent_id?: ID;
		user_id: ID;
	}) => {
		return await createTransaction(async (sql) => {
			if (!(await userOwnsTag({ user_id, tag_id: tag.tag_id }))) {
				throw new Error(`User ${user_id} does not own tag ${tag.tag_id}`);
			}

			// extract the updateable fields (i.e. strip user_id, tag_id)
			const { tag_id, user_id: _user_id, ...tagFields } = tag;
			const [updatedTag] = await sql<Tag[]>`
            update ${sql(TABLES.tags)}
            set ${sql(tagFields)}
            where tag_id = ${tag_id}
            and user_id = ${user_id}
            returning *
      `;

			// remove (and if new parent specified, re-link) parent
			await unlinkParentTag({ tag_id, user_id });
			if (!isNullish(parent_id)) {
				const authorized = await userOwnsTag({ user_id, tag_id: parent_id });
				if (!authorized) {
					throw new Error(
						`User ${user_id} does not own tag ${parent_id} intended as parent_id`
					);
				}

				await linkTagToParent({
					parent_id,
					child_id: updatedTag.tag_id,
					user_id,
				});
			}

			return;
		});
	}
);
