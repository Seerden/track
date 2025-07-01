import { createNote } from "@/lib/trpc/resolvers/note/insert-notes";
import { queryNotes } from "@/lib/trpc/resolvers/note/query-notes";
import { t } from "@/lib/trpc/trpc-context";

export const noteRouter = t.router({
	all: queryNotes,
	create: createNote,
});
