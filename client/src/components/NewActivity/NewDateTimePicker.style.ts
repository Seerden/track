import styled, { css } from "styled-components";

export const Form = styled.form`
	display: grid;
	width: 100%;
	gap: 0.7rem;
	margin: 1rem 0.5rem;
`;

const flexColumn = css`
	display: flex;
	flex-direction: column;
`;

const flexRow = css`
	display: flex;
	flex-direction: row;
`;

export const Row = styled.div`
	${flexRow};
	gap: 1rem;
	box-shadow: 0 0 0.3rem 0 #ccc;
	justify-content: space-between;
`;

export const Label = styled.label<{ $faded?: boolean }>`
	${flexColumn};
	align-items: stretch;
	margin: 0.5rem;
	width: 100%;

	// label text
	span {
		font-size: 0.86rem;
		background-color: #fff;
		width: 100%;
		padding: 0.2rem 0.6rem;
		border-radius: 0 15px 0 0;
		color: #777;
	}

	input {
		font-size: 0.94rem;
		outline: none;
		border: none;
		padding: 0.3rem 0.5rem;
		box-shadow: 0.4rem 0.4rem 0.1rem -0.2rem #ddd;
		border-radius: 3px;

		&[type="date"] {
			width: 120px;
		}

		&[type="text"] {
			width: 120px;

			&::placeholder {
				opacity: 0.6;
			}
		}
	}

	${(p) =>
		p.$faded &&
		css`
			&:not(input:focus) {
				opacity: 0.4;
			}
		`}
`;
export const Fields = styled.fieldset`
	${flexRow};
	padding: 0;
	max-width: 100%;

	${Label} {
		span {
		}
	}
`;

export const AllDay = styled.label`
	${flexRow};
	align-items: center;
	width: max-content;
	padding: 0 1rem;

	gap: 0.2rem;
	justify-content: center;
	background-color: #eaeaea;

	&:hover,
	&:focus-within,
	&:active {
		#off {
			color: #aaa;
		}

		#on {
			color: limegreen;
		}
	}
`;

export const Checkbox = styled.input`
	outline: none;
	border: none;
	width: 0px;
	height: 0px;
`;

export const Icon = styled.span`
	border: none;
	width: 30px;
	display: flex;
	justify-content: center;

	#off {
		color: #ccc;
	}

	#on {
		color: forestgreen;
	}
`;
