import { insertNoteWithTags } from "@/lib/data/models/notes/insert-note";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import { newNoteInputSchema } from "@shared/lib/schemas/note";

export const createNote = authenticatedProcedure
	.input(newNoteInputSchema)
	.mutation(async ({ input: { note, tagIds } }) => {
		return await insertNoteWithTags({
			note,
			tag_ids: tagIds,
		});
	});
