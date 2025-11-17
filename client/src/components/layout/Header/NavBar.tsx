import { Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAtom, useAtomValue } from "jotai";
import {
	LucideCalendar,
	LucideKeyboard,
	LucideMoon,
	LucideSun,
	LucideUserCircle,
} from "lucide-react";
import ActivityMenu from "@/components/layout/Header/ActivityMenu/ActivityMenu";
import { ProfileMenu } from "@/components/user/profile/Profile";
import { Protected } from "@/components/wrappers";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { shortcutMenuAtom } from "@/lib/hooks/useContextMenu";
import Buttons from "@/lib/theme/components/buttons";
import { themeAtom } from "@/lib/theme/theme-atom";
import S from "./style/NavBar.style";

export default function NavBar() {
	const shortcutMenu = useAtomValue(shortcutMenuAtom);
	const { isLoggedIn } = useAuthentication();
	const [themeValue, setThemeValue] = useAtom(themeAtom);
	const ThemeIcon = themeValue === "dark" ? LucideMoon : LucideSun;
	function toggleTheme() {
		setThemeValue((current) => {
			return current === "dark" ? "light" : "dark";
		});
	}

	return (
		<S.NavBar>
			<Link to="/">
				<S.HomeLink>
					<LucideCalendar strokeWidth={2} size={20} />
				</S.HomeLink>
			</Link>
			<S.Actions>
				<Buttons.Unstyled
					type="button"
					onClick={(e) => {
						e.preventDefault();
						toggleTheme();
					}}
					style={{
						borderRadius: "50%",
						width: 30,
						height: 30,
						alignSelf: "center",
						display: "flex",
						alignItems: "center",
					}}
				>
					<ThemeIcon size={23} />
				</Buttons.Unstyled>
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
	const [opened, { open, close, toggle }] = useDisclosure(false);

	if (isLoggedIn) {
		return (
			<Protected key={`${isLoggedIn}`}>
				<Popover
					opened={opened}
					onDismiss={close}
					onClose={close}
					closeOnEscape
					radius={"sm"}
					withArrow
					styles={{
						dropdown: {
							padding: 0,
						},
					}}
				>
					<Popover.Target>
						{/* TODO: styling */}
						<S.MenuTrigger type="button" onMouseEnter={open} onClick={toggle}>
							<LucideUserCircle size={23} />
						</S.MenuTrigger>
					</Popover.Target>
					<Popover.Dropdown
						onMouseLeave={async () => {
							// wait 100ms, then close
							await new Promise((resolve) => setTimeout(resolve, 100));
							close();
						}}
					>
						<ProfileMenu />
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
