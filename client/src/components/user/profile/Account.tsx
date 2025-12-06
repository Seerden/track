import styled from "@emotion/styled";
import { LucideShieldUser } from "lucide-react";
import Settings from "@/components/user/profile/settings/Settings";
import useAuthentication from "@/lib/hooks/useAuthentication";
import Containers from "@/lib/theme/components/container.style";
import { font } from "@/lib/theme/font";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const Datum = styled(Containers.Column)`
   outline: 2px solid var(--bg-3-2);
   background-color: ${(p) => p.theme.colors.background.main[2]};
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
		<Containers.Column
			style={{ padding: "1rem", maxWidth: "800px", marginInline: "auto" }}
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

			<Containers.Row
				style={{
					justifyContent: "space-between",
				}}
			>
				<Containers.Column gap="medium" style={{ flexGrow: 1 }}>
					<Containers.Column gap="large">
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
						{/* email address + verified icon */}
						<Datum>
							<div>Email address</div>
							<div>{email}</div>
						</Datum>
					</Containers.Column>
					{/* action links */}
					<ul style={{ listStyle: "none" }}>
						<li>change password</li>
						<li>change username</li>
						<li>update name</li>
						<li>delete account</li>
					</ul>
				</Containers.Column>

				<Settings />
			</Containers.Row>
		</Containers.Column>
	);
}
