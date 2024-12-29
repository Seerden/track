import { Unstyled } from "@/lib/theme/components/buttons";
import styled, { css } from "styled-components";

const itemStyle = css`
	border-radius: 5px;
	padding: 0.2rem 1rem;
	max-width: 100%;

	display: flex;
	align-items: center;
	justify-content: center;

	// dev
	outline: 2px solid #ddd;
`;

const SelectorButton = styled(Unstyled)`
	${itemStyle};
	width: max-content;
`;

const SelectorNewButton = styled.div`
	${itemStyle};
	flex-direction: row;
	height: max-content;
	font-size: 0.9rem;
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

export default {
	SelectorButton,
	SelectorNewButton
};
