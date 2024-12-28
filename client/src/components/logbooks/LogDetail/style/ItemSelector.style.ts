import { Unstyled } from "@/lib/theme/components/buttons";
import { flex } from "@/lib/theme/snippets/flex";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
	${flex.row};
	flex-wrap: wrap;
	max-width: 100%;

	@media (min-width: 1080px) {
		max-width: 500px;
	}

	gap: 1rem;
	padding: 0.5rem;

	// TODO: remove
	outline: 2px solid red;
`;

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

const ItemButton = styled(Unstyled)`
	${itemStyle};
	width: max-content;
`;

const NewItemButton = styled.div`
	${itemStyle};
	label {
		font-size: 0.9rem;
		width: max-content;

		div {
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
		}
	}
`;

export default {
	Wrapper,
	ItemButton,
	NewItemButton
};
