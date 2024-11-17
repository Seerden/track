import { useEffect } from "react";
import useMeQuery from "../query/user/useMeQuery";
import { localUser } from "../user-storage";
import useAuthentication from "./useAuthentication";

/** Reconcile client-side authentication state with server-side state. */
export default function useReconcileSession() {
	const { logout } = useAuthentication();
	const { data } = useMeQuery();

	// This used to be in the onSuccess callback of the useMeQuery hook
	useEffect(() => {
		const localMe = localUser.get();
		const user = data?.user;

		if (!data) return;

		if (user && !localMe) {
			return localUser.set(user);
		}

		if (!user) {
			if (localMe) {
				return logout();
			}
		} else {
			if (user !== localMe) {
				localUser.set(user);
			}
		}
	}, [data]);
}
