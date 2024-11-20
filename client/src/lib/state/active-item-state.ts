import type { ID } from "@t/data/utility.types";
import { atom } from "recoil";

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

export const activeItemState = atom<ActiveItemState>({
	key: "activeItemState",
	default: defaultActiveItemState
});
