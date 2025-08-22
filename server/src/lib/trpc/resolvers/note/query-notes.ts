import { queryNotesAndRelations } from "@/lib/data/models/notes/query-notes";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import { transformByIdToMap } from "@shared/lib/map";

export const queryNotes = authenticatedProcedure.query(
	async ({ ctx: { req } }) => {
		const notes = await queryNotesAndRelations({
			user_id: req.session.user.user_id,
		});
		return transformByIdToMap({ byId: notes });
	}
);
