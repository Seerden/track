import Button from "@/lib/theme/components/Button.style";
import { flex } from "@/lib/theme/snippets/flex";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled from "styled-components";

const NavBar = styled.nav`
	position: fixed;
	top: 0;

	background-color: #eee;
	width: 100%;
	${spacing.padding.wide({ size: 1.5, ratio: 2 })};
	z-index: 99;

	box-shadow:
		0 0.2rem 0 #ccc,
		0 0 0.4rem 0 black;
	outline: 2px solid #bbb;

	${flex.row};
	align-items: center;
	justify-content: space-between;
`;

const Actions = styled.ul`
	display: flex;
	justify-content: space-between;
	gap: 1rem;
`;

const Action = styled(Button.Unstyled)`
	cursor: pointer;
	list-style: none;
	border-radius: 5px;
	${spacing.padding.wide({ size: 0.5, ratio: 3 })};
	background-color: ${(p) => p.theme.colors.blue.main};
	color: white;
`;

export default {
	NavBar,
	Actions,
	Action
};
