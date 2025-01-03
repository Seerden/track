import { Unstyled } from "@/lib/theme/components/buttons";
import { containers } from "@/lib/theme/components/container.style";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacing, spacingValue } from "@/lib/theme/snippets/spacing";
import styled, { css } from "styled-components";

export const itemSectionStyle = css`
	border-radius: 5px;
	background-color: #eaeaea;
	box-shadow: 0 0.3rem 0.5rem 0 #ddd;
	border: 1px solid #fff;
	padding: 0.5rem 1rem;
	margin: 1rem 0;
`;

export const headerStyle = css`
	${radius.medium};
	padding-inline: 1rem;
	margin: 0;
	box-shadow: 0 0.5rem 1.5rem -0.6rem #ccc;
	border-bottom: 3px solid #fff;
	width: max-content;
`;

const itemStyle = css`
	${radius.small};
	${spacing.padding.wide({ size: 0.2, ratio: 1.5 })}
	max-width: 100%;

	display: flex;
	align-items: center;
	justify-content: center;

	border: 2px solid #ccc;
	background-color: #f9f9f9; // TODO: put this in the theme as 'offwhite'
	box-shadow: 0 0.3rem 0.2rem -0.3rem #999;

	&:active,
	&:focus,
	&:focus-within {
		border-color: ${(p) => p.theme.colors.blue.main};
	}
`;

const SelectorWrapper = styled.div`
	${flex.column};
	flex-wrap: wrap;

	max-width: 100%;
	@media (min-width: 1080px) {
		max-width: 500px;
	}

	gap: ${spacingValue.small};
`;

const SelectorButton = styled(Unstyled)<{ $compact?: boolean }>`
	${itemStyle};

	&:hover,
	&:focus {
		transform: translateY(2px);
	}

	width: max-content;
	gap: ${spacingValue.small};

	${(p) =>
		!p.$compact &&
		css`
			flex-grow: 1;
		`}
`;

const SelectorNewButton = styled.div`
	${itemStyle};

	flex-direction: row;
	height: max-content;
	width: max-content;

	gap: ${spacingValue.small};
	padding: ${spacingValue.smaller};

	input {
		background-color: transparent;
		outline: none;
		text-indent: 5px;
		border: none;
		border-bottom: 1px solid #ccc;
		padding: 0.2rem 0;
		min-width: 50px;
		max-width: 100%;

		&:focus {
			border-bottom: 2px solid ${(p) => p.theme.colors.blue.main};
			margin-bottom: -1px; // to adjust for the 1px increase in border size
		}
	}

	button {
		.lucide {
			border-radius: 50%;
		}

		&:focus,
		&:active,
		&:hover {
			.lucide {
				color: royalblue;
				background-color: #eee;
				stroke-width: 3px;
			}
		}
	}
`;

const SectionWrapper = styled.section`
	${containers.minimal};

	@media (min-width: 768px) {
		padding: 2.5rem;
		padding-right: 3.2rem; /* this is unconventional, but the best way to make the table look good */
	}
`;

export default {
	SelectorWrapper,
	SelectorButton,
	SelectorNewButton,
	SectionWrapper
};
