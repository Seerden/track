import { Popover } from "@mantine/core";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { LucideCalendar, LucideKeyboard, LucideUserCircle } from "lucide-react";
import ActivityMenu from "@/components/layout/Header/ActivityMenu/ActivityMenu";
import Profile from "@/components/user/profile/Profile";
import { Protected } from "@/components/wrappers";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { shortcutMenuAtom } from "@/lib/hooks/useContextMenu";
import { theme } from "@/lib/style/theme";
import S from "./style/NavBar.style";

export default function NavBar() {
	const shortcutMenu = useAtomValue(shortcutMenuAtom);
	const { isLoggedIn } = useAuthentication();

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
						<LucideKeyboard
							size={23}
							role="dialog"
							style={{ cursor: "pointer" }}
						/>
					</Popover.Target>
					<Popover.Dropdown>
						{JSON.stringify(Object.fromEntries(shortcutMenu))}
					</Popover.Dropdown>
				</Popover>
				<ActivityMenu />

				{/* NOTE: this needs to rerender when isLoggedIn changes, but it doesn't by default for some reason. */}
				<ProfileAction isLoggedIn={isLoggedIn} />
			</S.Actions>
		</S.NavBar>
	);
}

function ProfileAction({ isLoggedIn }: { isLoggedIn: boolean }) {
	const navigate = useNavigate();

	if (isLoggedIn) {
		return (
			<Protected key={`${isLoggedIn}`}>
				<Popover
					radius={"sm"}
					withArrow
					styles={{
						arrow: {
							backgroundColor: theme.colors.blue.main,
						},
						dropdown: {
							padding: 0,
						},
					}}
				>
					<Popover.Target>
						{/* TODO: styling */}
						<S.MenuTrigger type="button">
							<LucideUserCircle size={23} />
						</S.MenuTrigger>
					</Popover.Target>
					<Popover.Dropdown>
						<Profile />
					</Popover.Dropdown>
				</Popover>
			</Protected>
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
