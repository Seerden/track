import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";

export function makeUniqueLabel(activity: PossiblySyntheticActivity) {
	return `${activity.activity_id}/${activity.name}`;
}

export function getIdFromLabel(label: string) {
	const split = label.split("/");
	if (split.length < 2) {
		return label;
	}
	return split[0];
}

export function getNameFromLabel(label: string) {
	const split = label.split("/");
	if (split.length < 2) {
		return label;
	}
	return split.slice(1).join("/");
}
