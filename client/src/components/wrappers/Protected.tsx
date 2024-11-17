import useAuthentication from "@/lib/hooks/useAuthentication";
import useRouteProps from "@/lib/hooks/useRouteProps";
import type { PropsWithChildren } from "react";
import Login from "../auth/Login/Login";

export default function Protected({ children }: PropsWithChildren) {
	const { isLoggedIn, currentUser, data } = useAuthentication();
	const { params } = useRouteProps();

	if (!data) {
		return <></>;
	}

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
		return (
			<main>
				You must be logged in to view this component.
				<Login />
			</main>
		);
	}

	return <>{children}</>;
}
