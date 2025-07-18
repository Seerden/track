import { getFontSize } from "@/lib/theme/font";
import { outline } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
import Lucide from "@/lib/theme/snippets/lucide";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import S from "./Today.style";

const AllDayActivity = styled.li<{ $completed?: boolean }>`
	user-select: none;
	cursor: pointer;
	position: relative;
	list-style: none;

	color: white;
	background-color: dodgerblue;
	${outline.blue};
	box-shadow: 0 0.2rem 0.3rem 0 #aaa;

	${flex.row};
	align-items: center;
	font-size: ${(p) => getFontSize(p, 0.93)};
	${spacing.padding.wide({ size: 0.2, ratio: 5 })};
	padding-left: ${spacingValue.smaller};
	${radius.small};
	gap: ${spacingValue.medium};

	${(p) =>
		p.$completed &&
		css`
			opacity: 0.6;
		`}

	// TODO: this targets the icon, but should be something other than a p tag
	p {
		${flex.centered};
		${radius.largish};
		padding: 0.05rem;

		--size: 22px;
		width: var(--size);
		height: var(--size);

		${Lucide.BlackInWhite};

		${outline.primary};
		background-color: azure; // TODO: theme value
		box-shadow: 0 0 0.3rem 0 #333;
	}

	/* TODO: really should extract all of these checkbox styles */
	${S.CheckboxWrapper} {
		margin-left: auto;
		background-color: white;
		${radius.round};
	}
`;

export default {
	AllDayActivity
};
