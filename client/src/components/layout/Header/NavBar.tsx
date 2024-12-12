import LogbookMenu from "@/components/layout/Header/LogbookMenu/LogbookMenu";
import useAuthentication from "@/lib/hooks/useAuthentication";
import useRouteProps from "@/lib/hooks/useRouteProps";
import S from "./style/NavBar.style";

export default function NavBar() {
	return (
		<S.NavBar>
			<div>📅</div>
			<S.Actions>
				<input type="date" />
				<input type="text" placeholder="search" />
				<input type="button" value="create" />
			</S.Actions>
			<LogbookMenu />

			<ProfileAction />
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
