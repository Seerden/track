import type { AtLeast, HasUserIdField, ID } from "./utility.types";

function hasUserId<T extends HasUserIdField<unknown>>(
	thing: T
): thing is AtLeast<T, "user_id"> {
	return "user_id" in thing && thing.user_id !== null;
}

/**
 * @note @todo @deprecated TRK-236: in this PR, I'm refactoring useActivityForm a little bit. In
 * there, we called this function to check if the specified user_id is valid.
 * However, I've since decided to push that logic into the server (when creating
 * an activity, the server assigns the user_id from the session context to the
 * activity), and it's no longer passed from the client. I think we'll do the
 * same thing for other data types, making this function obsolete.
 */
export function hasValidUserId<T extends HasUserIdField<unknown>>(
	thing: T
): thing is T & { user_id: ID } {
	return (
		hasUserId(thing) &&
		(Number.isInteger(thing.user_id) || typeof thing.user_id === "string")
	);
}
