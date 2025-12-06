import type { PropsWithChildren } from "react";
import useAuthentication from "@/lib/hooks/useAuthentication";
import Login from "../auth/Login/Login";

export default function Protected({ children }: PropsWithChildren) {
	const { isLoggedIn, data } = useAuthentication();

	if (!data) {
		// TODO: this is a suspended state. Should probably throw an error state,
		// instead of returning an empty fragment, because the router loaders
		// should really always ensure the query was fetched.
		return <></>;
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
