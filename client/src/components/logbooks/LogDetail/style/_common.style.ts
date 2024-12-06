import { Action } from "@/lib/theme/components/buttons";
import { font } from "@/lib/theme/font";
import { spacing } from "@/lib/theme/snippets/spacing";
import styled, { css } from "styled-components";

const outline = {
	primary: css`
		outline: 2px solid #fff;
	`,
	secondary: css`
		outline: 2px solid #eee;
	`
};

const border = {
	primary: css`
		border: 1px solid #ccc;
	`,
	light: css`
		border: 1px solid #fff;
	`
};

const tints = {
	light: "#fff",
	secondary: "#eee",
	tertiary: "#e1e1e1",
	shade: {
		primary: "#ccc",
		secondary: "#bbb",
		tertiary: "#aaa"
	}
};

const cardShadow = css`
	box-shadow: 0 0 1rem 0 #bbb;
`;

const cardOffsetShadow = css`
	box-shadow: 0 0.2rem 0.4rem 0 #ddd;
`;

const sectionShadow = css`
	box-shadow: 0 0.3rem 0.3rem 0 #ddd;
`;

const listShadow = css`
	box-shadow: 0 0 0.5rem 0 #ccc;
`;

const radius = {
	small: css`
		border-radius: 3px;
	`,
	medium: css`
		border-radius: 5px;
	`,
	large: css`
		border-radius: 10px;
	`
};

const spacingValue = {
	small: "0.5rem",
	medium: "1rem",
	large: "2rem"
};

const padding = {
	small: css`
		padding: ${spacingValue.small};
	`,
	medium: css`
		padding: ${spacingValue.medium};
	`
};

const margin = {
	small: css`
		margin: ${spacingValue.small};
	`,
	medium: css`
		margin: ${spacingValue.medium};
	`,
	large: css`
		margin: ${spacingValue.large};
	`
};

export default {
	outline,
	border,
	tints,
	cardShadow,
	cardOffsetShadow,
	sectionShadow,
	spacingValue,
	listShadow,
	radius,
	padding,
	margin
};

// eslint-disable-next-line track/no-direct-styled-import
export const FieldWrapper = styled.div<{ $small?: boolean }>`
	${(p) => spacing.padding.wide({ size: p.$small ? 0.2 : 0.5, ratio: 2 })}

	border-radius: 5px;
	outline: 2px solid #ddd;
	margin: 0.3rem;
`;

export const Button = styled(Action.Default)<{ $iconPosition: "left" | "right" }>`
	width: max-content;
	border-radius: 10px;
	margin-left: 1rem;
	padding: 1.5rem 2.5rem;
	${(p) =>
		p.$iconPosition === "left"
			? css`
					padding-left: 1.5rem;
				`
			: css`
					padding-right: 1.5rem;
				`}
	color: white;
	display: flex;
	gap: 1rem;
`;

// eslint-disable-next-line track/no-direct-styled-import
export const Title = styled.h1`
	font-size: ${font.size["2"]};
	border-radius: 6px;
	padding-inline: 1rem;
	margin: 0;
	box-shadow: 0 0.5rem 1.5rem -0.6rem #ccc;
	border-bottom: 3px solid #fff;
`;