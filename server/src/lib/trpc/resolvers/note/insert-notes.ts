import { insertNoteWithTags } from "@/lib/data/models/notes/insert-note";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import { timestampSchema } from "@shared/lib/schemas/timestamp";
import { z } from "zod";

// TODO: amend this so that we parse user_id in from the request context,
// instead of letting the client send it
export const newNoteSchema = z.object({
	user_id: z.string(),
	activity_id: z.string().nullable().optional(),
	title: z.string().optional(),
	content: z.string(),
	date: timestampSchema,
});

export const newNoteInputSchema = z.object({
	note: newNoteSchema,
	tagIds: z.array(z.string()).optional(),
});

export const createNote = authenticatedProcedure
	.input(newNoteInputSchema)
	.mutation(async ({ input: { note, tagIds } }) => {
		return await insertNoteWithTags({
			note,
			tag_ids: tagIds,
		});
	});
