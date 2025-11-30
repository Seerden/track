import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import { activityEnd, activityStart } from "@/lib/activity";

export function getActivityKey(activity: PossiblySyntheticActivity) {
	return `
      ${activityStart(activity).valueOf()}-${activityEnd(activity).valueOf()}-${activity.name}
   `;
}
