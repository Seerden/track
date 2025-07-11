import { getFontSize } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";
import { spacing } from "@/lib/theme/snippets/spacing";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import S from "./Today.style";

const AllDayActivity = styled.li<{ $completed?: boolean }>`
	user-select: none;
	cursor: pointer;
	position: relative;
	list-style: none;
	background-color: dodgerblue;
	color: white;
	${spacing.padding.wide({ size: 0.2, ratio: 5 })};
	font-size: ${(p) => getFontSize(p, 0.93)};
	border-radius: 3px;
	outline: 2px solid dodgerblue;
	box-shadow: 0 0.2rem 0.3rem 0 #aaa;

	${flex.row};
	align-items: center;
	gap: 1rem;
	padding-left: 0.3rem;

	${(p) =>
		p.$completed &&
		css`
			opacity: 0.6;
		`}

	// TODO: this targets the icon, but should be something other than a p tag
	p {
		display: flex;
		align-items: center;
		justify-content: center;
		outline: 2px solid white;
		border-radius: 7px;
		padding: 0.05rem;
		--size: 22px;
		width: var(--size);
		height: var(--size);
		background-color: azure;

		.lucide {
			fill: white;
			color: black;
		}

		box-shadow: 0 0 0.3rem 0 #333;
	}

	/* TODO: really should extract all of these checkbox styles */
	${S.CheckboxWrapper} {
		margin-left: auto;
		background-color: white;
		border-radius: 50%;
	}
`;

export default {
	AllDayActivity
};
