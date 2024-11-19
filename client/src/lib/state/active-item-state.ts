import type { ActivityWithIds } from "@t/data/activity.types";
import type { HabitWithEntries } from "@t/data/habit.types";
import type { TagWithIds } from "@t/data/tag.types";
import type { ID } from "@t/data/utility.types";
import { atom } from "recoil";

type WithActiveItem<T> = {
	shouldShowModal: true;
	activeId: ID;
	activeItem: T;
};

type WithoutActiveItem = {
	shouldShowModal: false;
	activeId: null;
	activeItem: null;
};

type PossiblyActiveItem<T> = WithActiveItem<T> | WithoutActiveItem;

export type ActiveItemState = {
	tag: PossiblyActiveItem<TagWithIds>;
	habit: PossiblyActiveItem<HabitWithEntries>;
	activity: PossiblyActiveItem<ActivityWithIds>;
};

const defaultActiveItemState: ActiveItemState = {
	tag: {
		shouldShowModal: false,
		activeId: null,
		activeItem: null
	},
	activity: {
		shouldShowModal: false,
		activeId: null,
		activeItem: null
	},
	habit: {
		shouldShowModal: false,
		activeId: null,
		activeItem: null
	}
} as const;

export const activeItemState = atom<ActiveItemState>({
	key: "activeItemState",
	default: defaultActiveItemState
});
