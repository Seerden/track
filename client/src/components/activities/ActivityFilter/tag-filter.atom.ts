import type { ID, Nullable } from "@shared/types/data/utility.types";
import { atom } from "jotai";

export type TagFilter = {
	type: "includes" | "excludes";
	/** if `!exact`, it considers all ids from the tree that `id` is part of. */
	exact?: boolean;
	search: string;
	value: Nullable<ID[]>;
};

export const defaultTagFilter: TagFilter = {
	type: "includes",
	exact: true,
	search: "",
	value: null,
};

export const tagFilterAtom = atom<TagFilter>(defaultTagFilter);
