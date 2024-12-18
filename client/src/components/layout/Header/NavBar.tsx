import LogbookMenu from "@/components/layout/Header/LogbookMenu/LogbookMenu";
import useAuthentication from "@/lib/hooks/useAuthentication";
import useRouteProps from "@/lib/hooks/useRouteProps";
import { LucideCalendar } from "lucide-react";
import S from "./style/NavBar.style";

export default function NavBar() {
	return (
		<S.NavBar>
			<S.HomeLink to="/">
				<LucideCalendar strokeWidth={2} size={20} />
			</S.HomeLink>
			<S.Actions>
				<LogbookMenu />
				<ProfileAction />
			</S.Actions>
		</S.NavBar>
	);
}

function ProfileAction() {
	const { isLoggedIn, logout } = useAuthentication();
	const { navigate } = useRouteProps();

	if (isLoggedIn) {
		return (
			<S.Action type="button" onClick={() => logout()}>
				log out
			</S.Action>
		);
	}

	return (
		<S.Action
			type="button"
			onClick={() => {
				navigate("login");
			}}
		>
			log in
		</S.Action>
	);
}
