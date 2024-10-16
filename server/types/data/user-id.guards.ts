import { AtLeast, HasUserIdField } from "types/data/utility.types";

export function hasUserId<T extends HasUserIdField<unknown>>(
	thing: T
): thing is AtLeast<T, "user_id"> {
	return "user_id" in thing;
}
