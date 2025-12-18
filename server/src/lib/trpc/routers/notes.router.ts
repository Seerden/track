import { createNoteMutation } from "@/lib/trpc/resolvers/notes/insert-notes";
import { notesQuery } from "@/lib/trpc/resolvers/notes/query-notes";
import { t } from "@/lib/trpc/trpc-context";

export const notesRouter = t.router({
	all: notesQuery,
	create: createNoteMutation,
});
