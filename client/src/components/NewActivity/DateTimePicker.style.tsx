import styled, { css } from "styled-components";

export const Form = styled.form`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;

	margin: 0.4rem;
	padding: 0.3rem 0.9rem;
	max-width: max-content;

	border: 2px solid #bbb;
`;

export const Label = styled.label<{ invalid?: boolean }>`
	font-size: 0.9rem;

	display: flex;
	flex-direction: column;
	width: max-content;
	justify-content: space-between;

	input[type="checkbox"] {
		margin: 0.25rem 0;
		/* appearance: none; */
		accent-color: blue;
	}

	padding: 0.25rem 0.55rem;

	border: 2px solid ${(p) => (p.invalid ? "orangered" : "transparent")};
	border-bottom: ${(p) => (p.invalid ? css`2px solid orangered` : css`2px solid #bbb`)};

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
