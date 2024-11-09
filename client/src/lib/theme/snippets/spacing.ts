import type { CSSProperties } from "styled-components";
import { css } from "styled-components";

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

const margin = {
	wide: ({ size, ratio }: SpacingArgs) => getSpacing("margin", "wide", { size, ratio }),
	tall: ({ size, ratio }: SpacingArgs) => getSpacing("margin", "tall", { size, ratio })
} as const;

const padding = {
	wide: ({ size, ratio }: SpacingArgs) => getSpacing("padding", "wide", { size, ratio }),
	tall: ({ size, ratio }: SpacingArgs) => getSpacing("padding", "wide", { size, ratio })
} as const;

export const spacing = {
	margin,
	padding
};
