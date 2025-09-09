import type { Maybe } from "@shared/types/data/utility.types";
import type { Dispatch, SetStateAction } from "react";
import type { ActivityState } from "./activity-state.types";

export type DateTimePickerProps = {
	setActivity: Dispatch<SetStateAction<ActivityState>>;
	activity: Maybe<ActivityState>;
};
