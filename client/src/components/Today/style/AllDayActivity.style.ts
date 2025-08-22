import { getFontSize } from "@/lib/theme/font";
import { outline } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
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
	background-color: ${(p) => p.theme.colors.blue.main};
	${outline.blue};
	box-shadow: 0 0.2rem 0.3rem 0 #aaa;

	${flex.row};
	align-items: center;
	flex-grow: 1;
	max-width: 500px;

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

	/* TODO: really should extract all of these checkbox styles */
	${S.CheckboxWrapper} {
		margin-left: auto;
		background-color: white;
		${radius.round};
	}
`;

const ActivityName = styled.span`
	display: flex;
	max-width: 300px;
`;

export default {
	AllDayActivity,
	ActivityName,
};
