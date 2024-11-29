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

const padding = {
	small: css`
		padding: 0.5rem;
	`,
	medium: css`
		padding: 1rem;
	`
};

const margin = {
	small: css`
		margin: 0.5rem;
	`,
	medium: css`
		margin: 1rem;
	`
};

export default {
	outline,
	border,
	tints,
	cardShadow,
	listShadow,
	radius,
	padding,
	margin
};

// eslint-disable-next-line track/no-direct-styled-import
export const FieldWrapper = styled.div<{ small?: boolean }>`
	${(p) => spacing.padding.wide({ size: p.small ? 0.2 : 0.5, ratio: 2 })}

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
