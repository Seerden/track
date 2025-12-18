import { createNoteMutation } from "@/lib/trpc/resolvers/note/insert-notes";
import { notesQuery } from "@/lib/trpc/resolvers/note/query-notes";
import { t } from "@/lib/trpc/trpc-context";

export const notesRouter = t.router({
	all: notesQuery,
	create: createNoteMutation,
});
