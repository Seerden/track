import { Link } from "@tanstack/react-router";
import {
	LucideBadgeCheck,
	LucideChevronRight,
	LucideShieldUser,
} from "lucide-react";
import Settings from "@/components/user/profile/settings/Settings";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { colors } from "@/lib/theme/colors";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import { Title } from "@/lib/theme/components/text/title.style";
import S from "./style/Account.style";

export default function Account() {
	const { currentUser } = useAuthentication();

	if (!currentUser) {
		return null;
	}

	const { username, email, emailVerified, name } = currentUser;
	return (
		<S.Wrapper>
			<S.Header>
				<LucideShieldUser size={32} /> My Account
			</S.Header>

			<S.Sections>
				<Containers.Column gap="large" style={{ flexGrow: 1 }}>
					<Containers.Column gap="large">
						<Title.Menu.SectionHeader>
							Account information
						</Title.Menu.SectionHeader>
						<S.Datum>
							<div>Name</div>
							<div>{name}</div>
						</S.Datum>
						<S.Datum>
							<div>Username</div>
							<div>{username}</div>
						</S.Datum>
						<S.Datum>
							<div>Email address</div>
							<div>
								<span>{email}</span>
								{emailVerified && (
									<LucideBadgeCheck color={colors.green.secondary} />
								)}
							</div>
						</S.Datum>
					</Containers.Column>

					<S.Actions>
						<Title.Menu.SectionHeader>Update settings</Title.Menu.SectionHeader>
						<li>
							<Buttons.Action.MinimalPlus disabled>
								change password
							</Buttons.Action.MinimalPlus>
						</li>
						<li>
							<Link to="/auth/request-password-reset">
								<Buttons.Action.MinimalPlus style={{ width: "100%" }}>
									<span>forgot password</span>{" "}
									<span style={{ display: "flex", marginLeft: "auto" }}>
										<LucideChevronRight size={15} />
									</span>
								</Buttons.Action.MinimalPlus>
							</Link>
						</li>
						<li>
							<Buttons.Action.MinimalPlus disabled>
								change username
							</Buttons.Action.MinimalPlus>
						</li>
						<li>
							<Buttons.Action.MinimalPlus disabled>
								update name
							</Buttons.Action.MinimalPlus>
						</li>
						<li>
							<Buttons.Action.MinimalPlus disabled>
								delete account
							</Buttons.Action.MinimalPlus>
						</li>
					</S.Actions>
				</Containers.Column>

				<Settings />
			</S.Sections>
		</S.Wrapper>
	);
}
