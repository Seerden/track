import ActivityMenu from "@/components/layout/Header/ActivityMenu/ActivityMenu";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { Link, useNavigate } from "@tanstack/react-router";
import { LucideCalendar } from "lucide-react";
import S from "./style/NavBar.style";

export default function NavBar() {
	return (
		<S.NavBar>
			<Link to="/">
				<S.HomeLink>
					<LucideCalendar strokeWidth={2} size={20} />
				</S.HomeLink>
			</Link>
			<S.Actions>
				<ActivityMenu />
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
			<S.Action type="button" onClick={() => logout()} $color="darkBlue">
				log out
			</S.Action>
		);
	}

	return (
		<S.Action
			type="button"
			color="darkblue"
			onClick={() => {
				navigate({ to: "/login" });
			}}
		>
			log in
		</S.Action>
	);
}
