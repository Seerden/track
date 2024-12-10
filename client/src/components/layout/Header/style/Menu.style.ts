import { Unstyled } from "@/lib/theme/components/buttons";
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

const Menu = styled.div`
	color: #444;
	${flex.column};
	font-size: ${font.size["0.93"]};
	width: max-content;
	margin-top: 1rem;
	margin-right: 0.5rem;
	padding: 1.5rem;
	border: 2px solid #fff;
	outline: 2px solid #ccc;
	border-radius: 10px;
	background-color: #f3f3f3;
	box-shadow:
		0 0.2rem 0.1rem 0 #bbb,
		0 0.3rem 1rem 0 #aaa;

	/* Have to target the first and second children, because the first one is
      the FloatingArrow. */
	& > *:not(:first-child):not(:nth-child(2)) {
		border-top: 2px solid #ddd;
	}
`;

const Link = styled(RouterLink)`
	${flex.row};
	gap: 0.5rem;
	border-radius: 3px;
	padding: 0.2rem 0.5rem;
	border: 2px solid darkviolet;
	align-items: center;
	color: darkviolet;
	font-weight: 500;

	&:visited {
		font-weight: 600;
	}

	&:not(:nth-of-type(1)) {
		margin-top: 0.5rem;
	}
`;

const MenuSection = styled.div`
	${flex.column};

	gap: 0.4rem;

	&:not(:nth-of-type(1)) {
		margin-top: 1rem;
		padding-top: 1rem;
	}
`;

const MenuSectionHeader = styled.span`
	font-size: ${font.size["1"]};
	color: #222;
	border-radius: 5px;
	padding: 0.2rem 0.6rem;
	background-color: white;
	width: max-content;
	${flex.row};
	gap: 1rem;
	align-items: center;
	margin-left: -0.5rem;
`;

const LinkCards = styled.div`
	list-style: none;
	${flex.row};
	max-width: 220px;
	overflow-x: auto;
	gap: 0.5rem;
	flex-wrap: nowrap;
`;

const LinkCard = styled(RouterLink)`
	padding: 0.5rem;
	border-radius: 3px;
	background-color: orange;
	color: black;
	max-width: 100px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	flex: 1;
`;

const TriggerButton = styled(Unstyled)`
	font-size: ${font.size["0.93"]};
	color: #333;
	padding: 0.4rem 0.5rem;
	position: relative;
	width: max-content;
	border: 2px solid transparent;
	border-bottom-color: #ddd;
	box-shadow: 0 1.3rem 0 -1rem #ddd;

	&:hover,
	&:active,
	&:focus {
		border-radius: 5px;
		border-color: #ccc;
		box-shadow: 0 0.4rem 0.6rem -0.2rem #ccc;
		background-color: #e9e9e9;
	}
`;

export default {
	Menu,
	Link,
	MenuSectionHeader,
	MenuSection,
	LinkCards,
	LinkCard,
	TriggerButton
};
