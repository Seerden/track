import { css } from "@emotion/react";
import type { CSSProperties } from "react";

type SpacingRatio = 1 | 1.25 | 1.5 | 2 | 2.5 | 3 | 4 | 5;

type SpacingArgs = {
	size: CSSProperties["margin" | "padding"];
	ratio: SpacingRatio;
};
type SpacingRule = "padding" | "margin";
type SpacingType = "wide" | "tall";

function getSpacing(rule: SpacingRule, type: SpacingType, { size, ratio }: SpacingArgs) {
	const [small, big] = [`${size}rem`, `calc(${ratio} * ${size}rem)`] as const;
	const [vertical, horizontal] = type === "wide" ? [small, big] : [big, small];
	const value = `${vertical} ${horizontal}`;

	switch (rule) {
		case "margin":
			return css`
				margin: ${value};
			`;
		case "padding":
			return css`
				padding: ${value};
			`;
	}
}

export const spacingValue = {
	smallest: "0.2rem",
	smaller: "0.3rem",
	small: "0.5rem",
	medium: "1rem",
	large: "1.5rem",
	larger: "2rem"
};

const margin = {
	wide: ({ size, ratio }: SpacingArgs) => getSpacing("margin", "wide", { size, ratio }),
	tall: ({ size, ratio }: SpacingArgs) => getSpacing("margin", "tall", { size, ratio }),
	small: css`
		margin: ${spacingValue.small};
	`,
	smaller: css`
		margin: ${spacingValue.smaller};
	`,
	medium: css`
		margin: ${spacingValue.medium};
	`,
	larger: css`
		margin: ${spacingValue.larger};
	`
} as const;

const padding = {
	wide: ({ size, ratio }: SpacingArgs) => getSpacing("padding", "wide", { size, ratio }),
	tall: ({ size, ratio }: SpacingArgs) => getSpacing("padding", "tall", { size, ratio }),
	small: css`
		padding: ${spacingValue.small};
	`,
	smaller: css`
		padding: ${spacingValue.smaller};
	`,
	medium: css`
		padding: ${spacingValue.medium};
	`
} as const;

export const spacing = {
	margin,
	padding
};
