import type { MiddlewareState } from "@floating-ui/react";
import { detectOverflow } from "@floating-ui/react";

export function offsetIfOverflowing() {
	return {
		name: "offset-if-overflowing-middleware",
		async fn(state: MiddlewareState) {
			const overflow = await detectOverflow(state);
			// this middleware can come after e.g. shift(), which makes sure the
			// overflow.right === 0, hence we don't just check for > 0 below
			if (overflow.right >= 0) {
				return {
					x: state.x - 20
				};
			}
			return {};
		}
	};
}
