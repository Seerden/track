import type { AtLeast, HasUserIdField, ID } from "@/types/server/utility.types";

function hasUserId<T extends HasUserIdField<unknown>>(
	thing: T
): thing is AtLeast<T, "user_id"> {
	return "user_id" in thing && thing.user_id !== null;
}

export function hasValidUserId<T extends HasUserIdField<unknown>>(
	thing: T
): thing is T & { user_id: ID } {
	return hasUserId(thing) && Number.isInteger(thing.user_id);
}
