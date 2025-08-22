import { Popover } from "@mantine/core";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { LucideCalendar, LucideKeyboard } from "lucide-react";
import ActivityMenu from "@/components/layout/Header/ActivityMenu/ActivityMenu";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { shortcutMenuAtom } from "@/lib/hooks/useContextMenu";
import S from "./style/NavBar.style";

export default function NavBar() {
	const shortcutMenu = useAtomValue(shortcutMenuAtom);

	return (
		<S.NavBar>
			<Link to="/">
				<S.HomeLink>
					<LucideCalendar strokeWidth={2} size={20} />
				</S.HomeLink>
			</Link>
			<S.Actions>
				{/* TODO (TRK-257): finish this implementation */}
				<Popover>
					<Popover.Target>
						<LucideKeyboard role="dialog" style={{ cursor: "pointer" }} />
					</Popover.Target>
					<Popover.Dropdown>
						{JSON.stringify(Object.fromEntries(shortcutMenu))}
					</Popover.Dropdown>
				</Popover>
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
			}}>
			log in
		</S.Action>
	);
}
