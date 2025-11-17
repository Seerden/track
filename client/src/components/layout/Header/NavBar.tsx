import { Popover, Switch } from "@mantine/core";
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
import Menu from "@/components/layout/Header/Menu";
import { ProfileMenu } from "@/components/user/profile/Profile";
import { Protected } from "@/components/wrappers";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { shortcutMenuAtom } from "@/lib/hooks/useContextMenu";
import { colors, darkColors } from "@/lib/theme/colors";
import { themeAtom } from "@/lib/theme/theme-atom";
import S from "./style/NavBar.style";

export default function NavBar() {
	const shortcutMenu = useAtomValue(shortcutMenuAtom);
	const { isLoggedIn } = useAuthentication();
	const [themeValue, setThemeValue] = useAtom(themeAtom);
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
				<Switch
					onLabel={<LucideMoon size={18} fill={darkColors.blue.main} />}
					offLabel={<LucideSun size={18} fill={colors.yellow.main} />}
					checked={themeValue === "dark"}
					onChange={toggleTheme}
					size="md"
				/>

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
				<Menu id="ProfileMenu" Target={<LucideUserCircle size={23} />}>
					<ProfileMenu />
				</Menu>
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
