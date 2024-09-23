import { useEffect } from "react";
import useAuthentication from "../../lib/use-authentication";
import useReconcileSession from "../../lib/use-reconcile-session";
import useRouteProps from "../../lib/use-route-props";

export default function Header() {
	useReconcileSession();
	const { currentUser } = useAuthentication();

	const routeProps = useRouteProps();
	useEffect(() => {
		console.log({ routeProps });
	}, [routeProps]);

	useEffect(() => {
		console.log({ currentUser });
	}, [currentUser]);

	return <></>;
}
