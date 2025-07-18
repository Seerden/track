import type { ID } from "@shared/types/data/utility.types";
import { atom } from "jotai";

type PossiblyActiveItem = {
	activeId: ID | null;
};

type DetailTypes = "tag" | "habit" | "activity";

const inactive: PossiblyActiveItem = { activeId: null };

export type ActiveItemState = Record<DetailTypes, PossiblyActiveItem>;

const defaultActiveItemState: ActiveItemState = {
	tag: inactive,
	activity: inactive,
	habit: inactive
} as const;

export const activeItemAtom = atom<ActiveItemState>(defaultActiveItemState);
