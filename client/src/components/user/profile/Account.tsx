import styled from "@emotion/styled";
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
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const Actions = styled.ul`
   list-style: none;

   li {
      button {
         width: 100%;
         justify-content: start;
         align-items: start;
         text-align: start;
      }
   }

   width: max-content;
	${flex.column};
   gap: ${spacingValue.medium};
`;

const Datum = styled(Containers.Column)`
   outline: 2px solid var(--bg-3-2);
   background-color: var(--bg-3-2);
   padding: 0.3rem 0.5rem;
   gap: 0.1rem;

   width: 100%;
   max-width: 250px;
   box-shadow: 0.5rem 0.5rem 0 -0.35rem var(--bg-3-4);

   div {
      display: flex;

      &:first-of-type {
         background-color: ${(p) => p.theme.colors.background.main[3]};
         width: max-content;
         padding: 0.3rem 0.6rem;
         border-radius: 2px;
         z-index: 3;
         margin-top: -1.2rem;
         margin-left: -1.5rem;
         color: ${(p) => p.theme.colors.text.main[3]};
         font-style: italic;
         font-size: ${font.size["0.85"]};
      }

      &:nth-of-type(2) {
         padding-top: 0.3rem;
         ${flex.row};
         justify-content: space-between;
      }
   }
`;

export default function Account() {
	const { currentUser } = useAuthentication();

	if (!currentUser) {
		return null;
	}

	const { username, email, emailVerified, name } = currentUser;
	return (
		<div>
			<Containers.Column
				style={{
					padding: "1rem 2.5rem",
					maxWidth: "800px",
					marginInline: "auto",
					// TODO: the 5.4 rem (see page.tsx) is the header height. Need to
					// make it a constant or a theme value.
					marginTop: `calc(5.4rem + 1rem)`,
					backgroundColor: "var(--bg-2-1)",
					borderRadius: 3,
					boxShadow:
						"0 0.3rem 0.3rem 0 var(--bg-2-1), 0 0.3rem 0.4rem -0.2rem var(--bg-3-1)",
				}}
			>
				<h1
					style={{
						display: "flex",
						alignItems: "center",
						gap: "1rem",
						paddingBottom: spacingValue.small,
						borderBottom: "3px solid var(--bg-3-4)",
						borderRadius: 3,
						marginBottom: spacingValue.larger,
						boxShadow: `0 0.6rem 0 -0.45rem var(--bg-3-4)`,
					}}
				>
					<LucideShieldUser size={32} /> My Account
				</h1>

				<Containers.Row style={{ justifyContent: "space-between" }}>
					<Containers.Column gap="medium" style={{ flexGrow: 1 }}>
						<Containers.Column gap="large">
							<h2>Account information</h2>
							{/* name */}
							<Datum>
								<div>Name</div>
								<div>{name}</div>
							</Datum>
							{/* username */}
							<Datum>
								<div>Username</div>
								<div>{username}</div>
							</Datum>
							<Datum>
								<div>Email address</div>
								<div>
									<span>{email}</span>
									{emailVerified && (
										<LucideBadgeCheck color={colors.green.secondary} />
									)}
								</div>
							</Datum>
						</Containers.Column>

						<Actions>
							<h2>Update settings</h2>
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
						</Actions>
					</Containers.Column>

					<Settings />
				</Containers.Row>
			</Containers.Column>
		</div>
	);
}
