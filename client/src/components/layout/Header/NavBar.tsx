import { Popover, Switch, Tooltip } from "@mantine/core";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import {
	LucideCalendar,
	LucideFilter,
	LucideKeyboard,
	LucideMoon,
	LucideSun,
	LucideUserCircle,
} from "lucide-react";
import FilterTags from "@/components/activities/ActivityFilter/TagFilter";
import ActivityMenu from "@/components/layout/Header/ActivityMenu/ActivityMenu";
import Menu from "@/components/layout/Header/Menu";
import { ProfileMenu } from "@/components/user/profile/Profile";
import { Protected } from "@/components/wrappers";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { shortcutMenuAtom } from "@/lib/hooks/useContextMenu";
import { colors, darkColors } from "@/lib/theme/colors";
import { usePreferredTheme } from "@/lib/theme/theme-atom";
import S from "./style/NavBar.style";

export default function NavBar() {
	const shortcutMenu = useAtomValue(shortcutMenuAtom);
	const { isLoggedIn } = useAuthentication();
	const { themeValue, toggleThemeValue } = usePreferredTheme();

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
					onChange={toggleThemeValue}
					size="md"
				/>

				<Menu
					id="TagFilter"
					Target={
						<Tooltip position="right" label="Tag filter">
							<LucideFilter size={23} />
						</Tooltip>
					}
				>
					<div style={{ padding: "1rem" }}>
						<FilterTags />
					</div>
				</Menu>

				{/* TODO (TRK-257): finish this implementation */}
				<Popover>
					<Tooltip label="Shortcut menu" position="right">
						<Popover.Target>
							<LucideKeyboard
								size={23}
								role="dialog"
								style={{ cursor: "pointer" }}
							/>
						</Popover.Target>
					</Tooltip>

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
			onClick={() => {
				navigate({ to: "/login" });
			}}
		>
			log in
		</S.Action>
	);
}
