import ActionButtons from "@/lib/theme/components/buttons/Action";
import { flex } from "@/lib/theme/snippets/flex";
import { spacing } from "@/lib/theme/snippets/spacing";
import { Link } from "react-router-dom";
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

	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 2rem;
`;

const Actions = styled.div`
	${flex.row};
	gap: 3rem;
`;

const Action = styled(ActionButtons.Default)`
	margin-left: auto;
	border-radius: 5px;

	${spacing.padding.wide({ size: 0.5, ratio: 3 })};

	// Override defaults from the generic default Action button
	width: max-content;
	height: max-content;
`;

Action.defaultProps = {
	color: "darkBlue"
};

const HomeLink = styled(Link)`
	border-radius: 5px;
	min-width: 40px;
	min-height: 35px;
	justify-content: center;
	align-items: center;
	outline: 2px solid #eee;
	display: flex;
	background-color: #f9f9f9;
	box-shadow: 0 0.3rem 0.3rem -0.1rem #bbb;

	svg {
		color: #333;
	}

	&:hover,
	&:active,
	&:focus {
		outline: 2px solid #ddd;
		background-color: #eee;
		box-shadow: 0 0.3rem 0.3rem -0.2rem #bbb;
		transform: translateY(2px);
	}

	&:focus,
	&:active {
		outline-color: #ccc;
	}
`;

export default {
	NavBar,
	Actions,
	Action,
	HomeLink
};
