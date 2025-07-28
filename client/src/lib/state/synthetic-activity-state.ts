import type { SyntheticActivity } from "@shared/lib/schemas/activity";
import { atom } from "jotai";

export const syntheticActivitiesAtom = atom<SyntheticActivity[]>([]);
