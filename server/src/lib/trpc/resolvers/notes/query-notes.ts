import { transformByIdToMap } from "@shared/lib/map";
import { queryNotesAndRelations } from "@/lib/data/models/notes/query-notes";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const notesQuery = betterAuthProcedure.query(
	async ({ ctx: { user } }) => {
		const notes = await queryNotesAndRelations({
			user_id: user.id,
		});
		return transformByIdToMap({ byId: notes });
	}
);
