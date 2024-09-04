import { PropsWithChildren } from "react";
import useAuthentication from "../lib/use-authentication";
import useRouteProps from "../lib/use-route-props";

export default function Protected({ children }: PropsWithChildren) {
	const { isLoggedIn, currentUser } = useAuthentication();

	const { params } = useRouteProps();

	// If a route/component is user-specific, do this.
	if (params.username) {
		if (params.username !== currentUser?.username) {
			return (
				<div>
					If that user exists, you must be logged in as {params.username} to view
					this component.
				</div>
			);
		}
	}

	// If a route isn't user-specific, but still requires someone to be logged
	// in, do this.
	if (!isLoggedIn) {
		// this is temporary, maybe redirect to a Login. also, maybe give that an
		// optional property redirectTo which we can then route to on successful
		// login
		return <div>Must be logged in to view this component.</div>;
	}

	return <>{children}</>;
}
