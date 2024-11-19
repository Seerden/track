import type { ID, Maybe } from "@t/data/utility.types";
import { atom } from "recoil";

export const activeItemState = atom<Maybe<ID>>({
	key: "activeItemState",
	default: null
});
