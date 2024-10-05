import styled, { css } from "styled-components";

export const Wrapper = styled.div`
	padding: 0.5rem 1.1rem;
	padding-top: 0.8rem;
	margin: 1.2rem;
	border: 2px solid #ccc;
	box-shadow: 0 0 0.5rem 0 #aaa;
	max-width: 500px;

	h1 {
		font-size: 1.1rem;
		margin: 0;
		margin-left: 0.8rem;
		margin-top: -1.5rem;
		margin-bottom: 0.9rem;

		max-width: max-content;
		background-color: #ddd;
		padding: 0.5rem 1.4rem;
		box-shadow:
			-0.2rem 0.2rem 0 0 #ccc,
			-0.6rem -0.4rem 0 0 deepskyblue,
			0 0 0.2rem 0 #333,
			-0.2rem -0.3rem 0 0 white;
	}
`;

export const Row = styled.fieldset`
	display: flex;
	flex-direction: row;

	width: 100%;
	max-width: 100%;
	border: 1px solid #ccc;
	justify-content: space-between;
	box-shadow: 0.6rem 0.6rem 0 -0.5rem #555;

	&:focus-within {
		border-left-color: deepskyblue;
	}
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const Button = styled.button`
	padding: 0.6rem 1.5rem;
	margin-bottom: -1.5rem;
	margin-top: 0.3rem;
	align-self: center;
	width: max-content;
	font-size: 0.9rem;
	background-color: #ddd;
	border-radius: 5px;
	border: 2px solid transparent;
	box-shadow:
		0.1rem 0.1rem 0 0 white,
		0.5rem 0.5rem 0 0 deepskyblue;

	&:hover,
	&:focus,
	&:active {
		background-color: #eee;
		transform: translateY(-2px);
		border-color: deepskyblue;
	}
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
