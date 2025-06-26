import ActivityMenu from "@/components/layout/Header/ActivityMenu/ActivityMenu";
import LogbookMenu from "@/components/layout/Header/LogbookMenu/LogbookMenu";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { useNavigate } from "@tanstack/react-router";
import { LucideCalendar } from "lucide-react";
import S from "./style/NavBar.style";

export default function NavBar() {
	return (
		<S.NavBar>
			<S.HomeLink to="/">
				<LucideCalendar strokeWidth={2} size={20} />
			</S.HomeLink>
			<S.Actions>
				<ActivityMenu />
				<LogbookMenu />
				<ProfileAction />
			</S.Actions>
		</S.NavBar>
	);
}

function ProfileAction() {
	const { isLoggedIn, logout } = useAuthentication();
	const navigate = useNavigate();

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
				navigate({ to: "/login" });
			}}
		>
			log in
		</S.Action>
	);
}
