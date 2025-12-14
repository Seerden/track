import { atom } from "jotai";

/**
 * @note this is an atom so that it's easier to reset from e.g.
 * useSubmitNewActivity. */
export const activeTimelineRowAtom = atom<number | null>(null);
