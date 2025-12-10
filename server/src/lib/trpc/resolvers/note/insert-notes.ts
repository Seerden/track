import { newNoteInputSchema } from "@shared/lib/schemas/note";
import { insertNoteWithTags } from "@/lib/data/models/notes/insert-note";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const createNote = betterAuthProcedure
	.input(newNoteInputSchema)
	.mutation(async ({ input: { note, tagIds } }) => {
		return await insertNoteWithTags({
			note,
			tag_ids: tagIds,
		});
	});
