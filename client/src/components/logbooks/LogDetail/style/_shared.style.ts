import { Unstyled } from "@/lib/theme/components/buttons";
import { containers } from "@/lib/theme/components/container.style";
import styled, { css } from "styled-components";

const itemStyle = css`
	border-radius: 5px;
	padding: 0.2rem 0.3rem;
	max-width: 100%;

	display: flex;
	align-items: center;
	justify-content: center;

	// dev
	outline: 2px solid #ddd;
`;

const SelectorButton = styled(Unstyled)<{ $compact?: boolean }>`
	${itemStyle};
	width: max-content;

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

	gap: 0.5rem;
	padding: 0.3rem;

	input {
		background-color: #eee;
		outline: none;
		text-indent: 5px;
		border: none;
		border-bottom: 1px solid #ccc;
		padding: 0.2rem 0;
		min-width: 50px;
		max-width: 100%;
	}
`;

const SectionWrapper = styled.section`
	${containers.minimal};

	border: 3px solid red;
`;

export default {
	SelectorButton,
	SelectorNewButton,
	SectionWrapper
};
