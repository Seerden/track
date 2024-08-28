import styled, { css } from "styled-components";

export const Form = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
	justify-content: space-between;

	width: 100%;
`;

export const Label = styled.label<{ $showWarning?: boolean }>`
	font-size: 0.9rem;
	gap: 0.2rem;

	display: flex;
	flex-direction: column;
	width: max-content;
	justify-content: space-between;

	input[type="checkbox"] {
		margin: 0.25rem 0;
		/* appearance: none; */
		accent-color: blue;
	}

	input {
		&:not([type="checkbox"]) {
			max-width: 150px;
			width: 150px;
		}
	}

	padding: 0.25rem 0;

	border: 2px solid ${(p) => (p.$showWarning ? "orangered" : "transparent")};
	border-bottom: ${(p) =>
		p.$showWarning ? css`2px solid orangered` : css`2px solid #bbb`};

	border-radius: 3px;

	&:focus-within {
		border-bottom-color: deepskyblue;
	}
`;

export const Warning = styled.div`
	position: absolute;
	padding: 0.3rem 0.4rem;
	width: 100%;
	background-color: orangered;
	border: 2px solid orangered;
	border-radius: 0 0 5px 5px;
	color: white;
	font-size: 0.82rem;
`;
