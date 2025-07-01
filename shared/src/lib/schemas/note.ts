// TODO: amend this so that we parse user_id in from the request context,

import { timestampSchema } from "@shared/lib/schemas/timestamp";
import { z } from "zod";

// instead of letting the client send it
export const newNoteSchema = z.object({
	user_id: z.string(),
	activity_id: z.string().nullable().optional(),
	title: z.string().optional(),
	content: z.string(),
	date: timestampSchema,
});
export type NewNote = z.infer<typeof newNoteSchema>;

export const newNoteInputSchema = z.object({
	note: newNoteSchema,
	tagIds: z.array(z.string()).optional(),
});
export type NewNoteInput = z.infer<typeof newNoteInputSchema>;

export const noteSchema = newNoteSchema.and(
	z.object({
		note_id: z.string(),
		created_at: timestampSchema,
	}),
);
export type Note = z.infer<typeof noteSchema>;

export const noteWithIdsSchema = noteSchema.and(
	z.object({
		tag_ids: z.array(z.string()).optional(),
	}),
);
export type NoteWithIds = z.infer<typeof noteWithIdsSchema>;

export const noteInputSchema = z.object({
	note: newNoteSchema,
	tagIds: z.array(z.string()).optional(),
});
export type NoteInput = z.infer<typeof noteInputSchema>;
